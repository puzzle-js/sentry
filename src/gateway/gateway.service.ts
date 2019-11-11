import { Injectable } from '@nestjs/common';
import { Gateway } from './gateway.interface';

@Injectable()
export class GatewayService {
  private gateways: Gateway[] = [];

  add(gateway: Gateway) {
    this.gateways.push(gateway);
  }

  update(gateway: Gateway) {
    if ('name' in gateway) delete gateway.name;
    const gatewayToUpdate = this.gateways.find(gw => gw.name === gateway.name);
    if (!gatewayToUpdate) return false;
    const newGateways = this.gateways.filter(gw => gw.name === gatewayToUpdate.name);
    this.gateways = [...newGateways, { ...gatewayToUpdate, ...gateway }];
  }

  get() {
    return this.gateways;
  }
}
