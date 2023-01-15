import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { ServiceQueues, Services } from '@enum';

export const rabbitmqOptions = {
  noAck: false,
  queueOptions: {
    durable: false,
  },
};

export const getRMQConnectOption = (serviceName: Services): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URI],
    queue: ServiceQueues[serviceName],
    ...rabbitmqOptions,
  },
});

export const RMQClientsModuleConfig = (...serviceNames: Services[]) =>
  ClientsModule.register(
    serviceNames.map((serviceName) => ({
      name: serviceName,
      ...getRMQConnectOption(serviceName),
    }))
  );
