import grpc
from concurrent import futures
import grpcexample_pb2
import grpcexample_pb2_grpc

class Greeter(grpcexample_pb2_grpc.GreeterServicer):
    def SayHello(self, request, context):
        message = f"Olá, {request.name}!"
        return grpcexample_pb2.HelloReply(message=message)

    def SendPDF(self, request, context):
        filename = request.filename
        file_content = request.file_content

        with open(filename, "wb") as f:
            f.write(file_content)

        return grpcexample_pb2.PDFReply(message=f"Arquivo {filename} recebido!")


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    
    grpcexample_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    
    server.add_insecure_port('[::]:50051')
    
    print("Porta disponível 50051...")
    server.start()
    
    server.wait_for_termination()

if __name__ == '__main__':
    serve()