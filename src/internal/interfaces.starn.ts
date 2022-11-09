interface ParametersStarn {
  port: number;
  host?: string;
  topics: Array<string>;
}

interface ParametersConnectionStarn {
  port: number;
  host?: string;
}

interface ParametersSender {
  connection: ParametersConnectionStarn;
  typeMessage?: 'string' | 'array' | 'object' | 'buffer'
}

interface DataSender {
  message: any;
  time: number;
  messageSendindType: string;
  topic: string;
}

export {
  ParametersStarn,
  ParametersConnectionStarn,
  ParametersSender,
  DataSender 
};