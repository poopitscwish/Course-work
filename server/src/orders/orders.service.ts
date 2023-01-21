import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }


  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return this.orderRepository.
      createQueryBuilder("orders")
      .select()
      .innerJoin("orders.worker_id", "workers")
      .addSelect([
        "workers.id",
        "workers.first_name",
        "workers.second_name",
        "workers.last_name",
        "workers.phone_number"
      ])
      .getMany()
  }

  findOrdersByWorkerId(id: string) {
    return this.orderRepository.
      createQueryBuilder("orders")
      .select()
      .innerJoin("orders.worker_id", "workers")
      .addSelect([
        "workers.id",
        "workers.first_name",
        "workers.second_name",
        "workers.last_name",
        "workers.phone_number"
      ])
      .where("orders.worker_id = :id", {id})
      .getMany()
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
