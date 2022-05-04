import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Protocol = createParamDecorator(
  (defaultValue: string, cxt: ExecutionContext) => {
    console.log({ defaultValue });
    const request = cxt.switchToHttp().getRequest();
    return request.protocol;
  },
);
