import { Injectable } from "@nestjs/common";
import { Transaction } from "./domain/transaction";
import { TransactionRelationalRepository } from "./infrastructure/persistence/relational/repositories/transaction.repository";
import { UsersService } from "./users.service";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class TransactionService {
  constructor(
    private readonly genericRepository: TransactionRelationalRepository,
    private readonly userServices: UsersService,
    private readonly mailService: MailService,
  ) {}

  async create(transactionData: Transaction, recharge?:boolean): Promise<any> {
    let transaction = await this.genericRepository.create(transactionData);
    //console.log(transaction)
    let user = await this.userServices.findOne({id: transactionData.user.id})
    //console.log(user)
    if(user?.saldo && !recharge){
      const novoSaldo = user?.saldo - transaction?.total;
      await this.userServices.update(transactionData.user.id,{ saldo: novoSaldo})
    }

    let tsc = await this.findOne(transaction.id)
    //console.log(tsc.products)

    let parent = await this.userServices.findOne({email: user?.emailParent})

    //todo depois ver isso
    if(!recharge){
      await this.mailService.userTransaction({
        to: `${parent?.email}`,// todo aqui tem que ser email do pai
        data: {
          user: `${parent?.firstName}`,
          child: `${user?.firstName} ${user?.lastName}`,
          value: `R$${transaction.total}`,
            "transactions": this.convertProductEntities(tsc.products)
        },
      });
    }else{

      console.log({
        to: `${parent?.email}`,// todo aqui tem que ser email do pai
        data: {
          user: `${parent?.firstName}`,
          child: `${user?.firstName} ${user?.lastName}`,
          value: `R$${transaction.total}`
        },
      })

      await this.mailService.userTransactionRecharge({
        to: `${parent?.email}`,// todo aqui tem que ser email do pai
        data: {
          user: `${parent?.firstName}`,
          child: `${user?.firstName} ${user?.lastName}`,
          value: `R$${transaction.total}`
        },
      });

      //console.log("envia email de recarga")
    }



    return transaction;
  }

  convertProductEntities(products: any[]): any[] {
    return products.map(product => ({
        produto: product.nome,
        preco: parseFloat(product.preco),
        quantidade: 1, // Altere conforme necessário //todo depois ver isso
        data_hora: new Date().toISOString() // Pode alterar para a data/hora desejada
    }));
}

  async findAll(): Promise<any> {
    return this.genericRepository.findManyWithPagination();
  }

  async findAllCompra(): Promise<any> {
    return this.genericRepository.findManyWithPaginationAll();
  }

  async countAll(): Promise<any> {
    return this.genericRepository.countAll();
  }

  async findOne(_id: any): Promise<any> {
    return this.genericRepository.findOne({id: _id});
  }

}


