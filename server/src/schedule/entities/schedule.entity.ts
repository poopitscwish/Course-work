import { Worker } from "src/workers/entities/worker.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity("schedule")
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: 'datetimeoffset' })
    day_start: string
    @Column({ type: 'datetimeoffset' })
    day_end: string
    @ManyToOne(() => Worker, (worker) => worker.id, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: "worker_id" }])
    worker_id: number
}
