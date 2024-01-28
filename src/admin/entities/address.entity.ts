import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity()
@ObjectType()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  block: string;

  @Column()
  @Field()
  street: string;

  @Column()
  @Field()
  barangay: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  province: string;

  @Column()
  @Field()
  zip_code: string;

  @OneToOne(() => Admin, (admin) => admin.address, { onDelete: 'CASCADE' })
  @JoinColumn()
  admin: Admin;
}
