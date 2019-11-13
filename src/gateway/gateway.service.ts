import { Injectable } from '@nestjs/common';
import { Gateway } from './gateway.interface';

@Injectable()
export class GatewayService {
  private gateways: Gateway[] = [];

  add(gateway: Gateway) {
    this.gateways.push(gateway);
  }

  delete(name: string) {
    const gatewayToDelete = this.gateways.find(fr => fr.name === name);
    if (!gatewayToDelete) return false;
    const newgateways = this.gateways.filter(fr => fr.name === name);
    this.gateways = [...newgateways];
    return true;
  }

  update(gateway: Gateway) {
    const gatewayToUpdate = this.gateways.find(gw => gw.name === gateway.name);
    if (!gatewayToUpdate) return false;
    const newGateways = this.gateways.filter(gw => gw.name === gatewayToUpdate.name);
    this.gateways = [...newGateways, { ...gatewayToUpdate, ...gateway }];
  }

  get() {
    return this.gateways;
  }
}
