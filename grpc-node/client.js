var PROTO_PATH = '../grpcexample.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var fs = require('fs');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
    const argv = require('minimist')(process.argv.slice(2));
    const target = argv.target || 'localhost:50051';
    const client = new hello_proto.Greeter(target, grpc.credentials.createInsecure());
  
    if (argv._[0] === "sendpdf") {
      const filename = argv.filename || "Tabela_Jogos_Internos_CNAT_2024_oficial.pdf";
      const fileContent = fs.readFileSync(filename);
  
      client.SendPDF({ filename: filename, file_content: fileContent }, (err, response) => {
        if (err) {
          console.error("Error:", err.message);
        } else {
          console.log(response.message);
        }
      });
    } else {
      const user = argv._[0] || "World";
      client.SayHello({ name: user }, (err, response) => {
        if (err) {
          console.error("Error:", err.message);
        } else {
          console.log(response.message);
        }
      });
    }
  }
  
  main();
  