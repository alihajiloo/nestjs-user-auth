import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('User')
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 30 })
  public name: string;

  @Column({ type: 'int', default: 0 })
  public age: number;

  @Column({ type: 'varchar' })
  private password: string;

  @Column({ type: 'varchar' })
  private rePassword: string;

  @Column({ unique: true, type: 'varchar', length: 11 })
  public mobile: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt: Date;

  async setPassword(password: string, rePassword: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
    this.rePassword = await bcrypt.hash(rePassword, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

export default User;
