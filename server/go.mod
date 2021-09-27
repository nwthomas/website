// Great article on setting up Golang modules instead of $GOPATH workspaces:
// https://medium.com/mindorks/create-projects-independent-of-gopath-using-go-modules-802260cdfb51
module github.com/nwthomas/personal-portfolio

go 1.16

require (
	github.com/gorilla/handlers v1.5.1
	github.com/gorilla/mux v1.8.0
	github.com/joho/godotenv v1.3.0
)
