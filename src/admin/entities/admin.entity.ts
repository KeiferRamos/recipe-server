import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
@ObjectType()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  middle_name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  last_name?: string;

  @Column()
  @Field()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  contact_no?: string;

  @OneToOne(() => Address, (address) => address.admin, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @Field(() => Address, { nullable: true })
  address?: Address;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: string;

  @ManyToMany(() => Role, (role) => role.admin, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Field(() => [Role])
  roles: Role[];
}
