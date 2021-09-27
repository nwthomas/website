package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	// This autoloads in the environment variables from a local .env file
	_ "github.com/joho/godotenv/autoload"
)

type Response struct {
	Message 	string `json:"message"`
}

type ReceivedEmail struct {
	Name 		string `json:"name"`
	Email 		string `json:"email"`
	Subject 	string `json:"subject"`
	Message 	string `json:"message"`
	// Fax is the honeypot field; if present, do not send on to email
	Fax 		string `json:"fax,omitempty"`
}

func sendEmail(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var email ReceivedEmail
	_ = json.NewDecoder(r.Body).Decode(&email)

	if len(email.Fax) > 0 {
		http.Error(w, "Please try again", http.StatusBadRequest)
	} else {
		// A great guide for sending SMTP with Golang is at https://www.admfactory.com/send-emails-using-golang/
		personalEmail := os.Getenv("EMAIL_PERSONAL_ADDRESS")
		password := os.Getenv("EMAIL_PASSWORD")
		from := personalEmail
		to := []string {
			personalEmail,
		}

		smtpHost := os.Getenv("EMAIL_HOST")
		smtpPort := os.Getenv("EMAIL_PORT")

		message := fmt.Sprintf("From: %s\r\n", personalEmail) +
		fmt.Sprintf("To: %s\r\n", personalEmail) + 
		fmt.Sprintf("Subject: %s\r\n", email.Subject) +
		"\r\n" +
		fmt.Sprintf("Email is from %s at %s\r\n\r\n%s\r\n", email.Name, email.Email, email.Message)
		
		auth := smtp.PlainAuth("", personalEmail, password, smtpHost)
		smtpAddress := smtpHost + ":" + smtpPort
		err := smtp.SendMail(smtpAddress, auth, from, to, []byte(message))

		if err != nil {
			http.Error(w, "Please try again", http.StatusBadRequest)
		} else {
			r := Response{ Message: "Email sent" }
			json.NewEncoder(w).Encode(r)
		}
	}
}

func returnMessage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(Response{ Message: "The server is alive" })
}

func main() {
	port := os.Getenv("PORT")
	router := mux.NewRouter()

	// TODO - Update this to only be for my domain once server is live
	corsObj := handlers.AllowedOrigins([]string{"*"})
	
	router.HandleFunc("/api/send-email", sendEmail).Methods(http.MethodPost)
	router.HandleFunc("/", returnMessage).Methods(http.MethodGet)
	
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), handlers.CORS(corsObj)(router)))
}