import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {ApiTags } from '@nestjs/swagger';
import { Transaction } from './domain/transaction';
import { TransactionService } from './transaction.service';
import { UsersService } from './users.service';
const stripe = require('stripe')('sk_test_51Lf33zDpCjHUfGtEgMVXG2Xg3z6wr1Yq4SIOAxvRKyYHlF9pByEqECT8GaqNvqKp1K8XY0xyq3h6Fwv6Aso2Aq6M001sYpix2p');

@ApiTags('Transaction')
@Controller({
  path: 'transaction',
  version: '1',
})
export class TransactionController {
  constructor(private readonly categoryService: TransactionService,
    private readonly usersService: UsersService) {}


  // @ApiBearerAuth()
  // @Roles(RoleEnum.admin)
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @SerializeOptions({
  //   groups: ['admin'],
  // })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() transactionData: Transaction): Promise<Transaction> {

    // {
    //   "user": { "id": 16},
    //   "products": [
    //     {
    //       "id": 20
    //     },
    //     {
    //       "id": 21
    //     }
    //   ],
    //   "total": 10,
    //   "type": "compra"
    // }
    return this.categoryService.create(transactionData);
  }

//   @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @SerializeOptions({
//     groups: ['admin'],
//   })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Transaction[]> {
    return this.categoryService.findAll();
  }

  @Get('tudo')
  @HttpCode(HttpStatus.OK)
  async findAllCompra(): Promise<Transaction[]> {
    return this.categoryService.findAllCompra();
  }



  @Post("/recharge")
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Body() data: any): Promise<any> {
    try {
      const { token, amount, email } = data;

      // Crie uma cobrança usando o token do cliente, quantidade e e-mail
      const charge = await stripe.charges.create({
        amount: amount * 100,
        currency: 'brl',
        description: 'Recarga de Créditos Saborito',
        source: token,
        receipt_email: email
      });

      let user = await this.usersService.findOne({email:email})
      if(user){
        // Converter o saldo do usuário para número
        let saldoAtual = parseFloat(String(user.saldo));
        
        // Converter o valor a ser adicionado para número
        let amountNumerico = parseFloat(amount);

        // Calcular o novo saldo
        let novoSaldo = saldoAtual + amountNumerico;

         // Arredondar o novo saldo para garantir que tenha duas casas decimais
          novoSaldo = Math.round(novoSaldo * 100) / 100;

        //console.log(novoSaldo)
        await this.usersService.update(user.id,{saldo : novoSaldo})
      }

      let transactionData = {
        "user": { "id": user?.id},
        "total": amount,
        "type": "recarga"
      } as Transaction
      this.categoryService.create(transactionData,true)

      //todo enviar email

      return { success: true, message: 'Pagamento processado com sucesso!' };
    } catch (error) {
      // Se ocorrer algum erro, retorne o erro
      console.error('Erro ao processar pagamento:', error);
      return { success: false, error: 'Erro ao processar pagamento.' };
    }
  }

  @Get('count')
  @HttpCode(HttpStatus.OK)
  async countAll(): Promise<any> {
    return this.categoryService.countAll();
  }


}









