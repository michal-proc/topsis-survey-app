# Rollerskates Decision Support

## About the Application
Rollerskates Decision Support is an advanced tool designed to support **Technique for Order Preference by Similarity to Ideal Solution (TOPSIS)** for decision analysis. Our application provides maximum flexibility, allowing users to define an unlimited number of **alternatives** and **criteria**, while also enabling collaboration with multiple experts simultaneously. This approach ensures precise comparison of different options, leading to the most accurate final ranking.

### Key Features
- **Custom Decision Models** – Define an unlimited number of alternatives and criteria for decision-making.
- **Expert Collaboration** – Gather input from multiple experts using evaluations and weight assignments.
- **Automated Ranking Calculation** – Compute the final ranking based on the provided data using TOPSIS.
- **Handling Incomplete Data** – Utilize advanced algorithms to process incomplete information.
- **Data Import & Export** – Save and load data in file format for easy sharing between users.

With these features, users can build comprehensive decision models enriched with expert data. The **multi-criteria analysis algorithms** ensure optimal decision-making support, making the tool ideal for data-driven decision-making, regardless of complexity.

## Technology Stack
The application is built using modern technologies that ensure performance, flexibility, and scalability:

### **Frontend**
- **React with TypeScript** – Provides a fast, responsive, and user-friendly interface.

### **Backend**
- **Python with FastAPI** – A lightweight and efficient API framework that processes data quickly.

### **DevOps**
- **Docker** – The entire application is containerized for easy deployment, configuration, and scaling.

By combining these technologies, Rollerskates Decision Support is not only powerful and functional but also easy to deploy and maintain—an ideal solution for teams working on complex decision-making projects.

## About TOPSIS & Surveys
TOPSIS is a decision-making methodology based on **multi-criteria analysis**, ensuring decisions align with realistic decision-maker preferences. Users define alternatives and criteria, then input **weights and evaluations** for each alternative. The application processes these values using TOPSIS computations to determine the most optimal solution, generating the final ranking.

Collaboration with experts ensures **objective results**, while support for **incomplete data** guarantees usability even when full information is unavailable.

## Installation & Setup
To run the application locally, follow these steps:

### Prerequisites
- **Node.js** (for frontend development)
- **Python 3.8+** (for backend API)
- **Docker** (for containerized deployment)

### Running the Application
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository/topsis-survey-app.git
   cd topsis-survey-app
   ```
2. Start the application with Docker:
   ```sh
   docker-compose up --build
   ```
   This will start both the frontend and backend in their respective containers.

3. Open the application in your browser at `http://localhost:3000`

### Running Without Docker
If you prefer to run the services manually, follow these steps:

#### Start the Backend API:
   ```sh
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```
#### Start the Frontend:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

## Contributing
We welcome contributions! If you'd like to improve the project, please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License
This project is licensed under the MIT License.

---

If you have any questions or issues, feel free to contact us or open an issue in the repository!

