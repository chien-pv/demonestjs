import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Categoty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;
}
