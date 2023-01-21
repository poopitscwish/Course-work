import { Worker } from "src/workers/entities/worker.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    accept:Date
    @Column()
    issue:Date
    @Column()
    check_amount:number
    @ManyToOne(()=>Worker, (worker)=> worker.id)
    @JoinColumn([{name:"worker_id"}])
    worker_id:number
}
