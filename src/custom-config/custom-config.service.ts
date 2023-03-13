import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { isNil } from "lodash";

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get<Response>(arg: string): Response {
    const response = this.configService.get<Response>(arg);

    if (isNil(response)) {
      throw new Error(`Pls, setup ${arg} variable`);
    }

    return response;
  }

  public getOptional<Response>(arg: string): Response {
    return this.configService.get<Response>(arg);
  }
}
