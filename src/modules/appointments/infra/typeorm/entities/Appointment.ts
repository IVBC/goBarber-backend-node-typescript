import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // Varios agendamentos pertence a um usuario
  @JoinColumn({ name: 'provider_id' }) // indica qual coluna de appointment vai representar o usuario
  provider: User;

  @Column()
  user_id: string;

  @ManyToOne(() => User) // Varios agendamentos pertence a um usuario
  @JoinColumn({ name: 'user_id' }) // indica qual coluna de appointment vai representar o usuario
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
