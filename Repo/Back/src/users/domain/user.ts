import { Exclude, Expose } from 'class-transformer';
import { FileType } from 'src/files/domain/file';
import { Role } from 'src/roles/domain/role';
import { Status } from 'src/statuses/domain/status';

export class User {
  id: number | string;
  socialId?: string | null;
  saldo?: number | null | undefined;
  firstName: string | null;
  lastName: string | null;
  photo?: FileType | null;


  // @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  role?: Role | null;
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  emailParent: string | null | undefined;
}
