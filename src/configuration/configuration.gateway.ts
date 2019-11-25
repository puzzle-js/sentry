import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ConfigurationService } from './configuration.service';
import { Server } from 'socket.io';
import { Configuration } from './configuration.interface';
import { PlatformTypes } from '../enums';

@WebSocketGateway()
export class ConfigurationGateway {
  constructor(private readonly configurationService: ConfigurationService) { }
  @WebSocketServer() server: Server;

  @SubscribeMessage('panel.configurations.storefronts.get')
  async getStorefrontConfigsForPanel() {
    const configs = await this.configurationService.getAll(PlatformTypes.Storefront);
    return { event: `panel.configurations.storefronts`, data: configs };
  }

  @SubscribeMessage('panel.configurations.gateways.get')
  async getGatewayConfigsForPanel() {
    const configs = await this.configurationService.getAll(PlatformTypes.Gateway);
    return { event: `panel.configurations.gateways`, data: configs };
  }

  @SubscribeMessage('panel.configurations.storefront.add')
  async addStorefrontConfigs(@MessageBody() body: { configurations: Configuration[], name: string }) {
    if (!body.configurations) return null;
    const configs = await this.configurationService.add(PlatformTypes.Storefront, body.name, body.configurations);
    this.server.emit(`panel.configurations.storefront.${body.name}`, configs);
  }

  @SubscribeMessage('configurations.storefront.get')
  async getStorefrontConfigs(@MessageBody() body: { name: string }) {
    if (!body.name) return null;
    const configs = await this.configurationService.get(PlatformTypes.Storefront, body.name);
    return { event: `configurations.storefront.${body.name}`, data: configs };
  }

  @SubscribeMessage('configurations.gateway.get')
  async getGatewayConfigs(@MessageBody() body: { name: string }) {
    if (!body.name) return null;
    const configs = await this.configurationService.get(PlatformTypes.Gateway, body.name);
    return { event: `configurations.gateway.${body.name}`, data: configs };
  }
}
