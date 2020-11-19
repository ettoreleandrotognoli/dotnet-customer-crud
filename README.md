# D1.cx Customer CRUD Test


Start a mongodb on localhost, user `root` and password `root`

Suggested command:
```sh
podman run -d --name mongodb -p 27017:270127 -eMONGO_INITDB_ROOT_USERNAME=root -eMONGO_INITDB_ROOT_PASSWORD=root mongo
```


Start the CustomerApp

```sh
dotnet run CustomerApp.csproj
```