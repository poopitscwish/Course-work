import { Menu } from "src/menu/entities/menu.entity";
import { Order } from "src/orders/entities/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("list")
export class List {
    @PrimaryGeneratedColumn()
    id:number
    @ManyToOne(()=>Order, (order)=>order.id)
    @JoinColumn([{name:"order_id"}])
    order_id:number
    @ManyToOne(()=>Menu, (menu)=>menu.id)
    @JoinColumn([{name:"menu_id"}])
    menu_id:number
}
