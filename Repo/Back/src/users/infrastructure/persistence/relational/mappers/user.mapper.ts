import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';
import { User } from '../../../../domain/user';
import { UserEntity } from '../entities/user.entity';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';
import { StatusEntity } from 'src/statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    //console.log(raw)
    const user = new User();
    user.id = raw.id;
    user.email = raw.email;
    user.password = raw.password;
    user.previousPassword = raw.previousPassword;
    user.provider = raw.provider;
    user.socialId = raw.socialId;
    user.firstName = raw.firstName;
    user.lastName = raw.lastName;
    user.saldo = raw.saldo;
    if (raw.photo) {
      user.photo = FileMapper.toDomain(raw.photo);
    }
    user.role = raw.role;
    user.status = raw.status;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    user.deletedAt = raw.deletedAt;
    user.emailParent = raw.emailParent;
    return user;
  }

  static toPersistence(user: User): UserEntity {
    //console.log(user)
    let role: RoleEntity | undefined = undefined;

    if (user.role) {
      role = new RoleEntity();
      role.id = user.role.id;
    }

    let photo: FileEntity | undefined | null = undefined;

    if (user.photo) {
      photo = new FileEntity();
      photo.id = user.photo.id;
      photo.path = user.photo.path;
    } else if (user.photo === null) {
      photo = null;
    }

    let status: StatusEntity | undefined = undefined;

    if (user.status) {
      status = new StatusEntity();
      status.id = user.status.id;
    }

    const userEntity = new UserEntity();
    if (user.id && typeof user.id === 'number') {
      userEntity.id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.previousPassword = user.previousPassword;
    userEntity.provider = user.provider;
    userEntity.socialId = user.socialId;
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.saldo = user.saldo;
    userEntity.photo = photo;
    userEntity.role = role;
    userEntity.status = status;
    userEntity.emailParent = user.emailParent;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    return userEntity;
  }
}
