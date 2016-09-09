FROM microsoft/dotnet
EXPOSE 80

WORKDIR /app
COPY . ./src
RUN dotnet restore \
 && dotnet publish -c Release -o . ./src \
 && rm -rf $HOME/.nuget ./src

CMD ["dotnet", "service-b.dll"]
