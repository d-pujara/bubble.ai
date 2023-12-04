sql
Copy code
-- Users table
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Balance DECIMAL(10, 2) DEFAULT 0.00
);

-- Op-Eds table
CREATE TABLE OpEds (
    OpEdID INT PRIMARY KEY,
    UserID INT,
    Title VARCHAR(255) NOT NULL,
    Content TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Videos table
CREATE TABLE Videos (
    VideoID INT PRIMARY KEY,
    UserID INT,
    Title VARCHAR(255) NOT NULL,
    VideoURL VARCHAR(255) NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Comments table
CREATE TABLE Comments (
    CommentID INT PRIMARY KEY,
    UserID INT,
    OpEdID INT,
    VideoID INT,
    Content TEXT NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (OpEdID) REFERENCES OpEds(OpEdID),
    FOREIGN KEY (VideoID) REFERENCES Videos(VideoID)
);

-- Contributions table
CREATE TABLE Contributions (
    ContributionID INT PRIMARY KEY,
    UserID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Payouts table
CREATE TABLE Payouts (
    PayoutID INT PRIMARY KEY,
    UserID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Donations table
CREATE TABLE Donations (
    DonationID INT PRIMARY KEY,
    UserID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    ContributionID INT,
    PaymentID INT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ContributionID) REFERENCES Contributions(ContributionID),
    FOREIGN KEY (PaymentID) REFERENCES Payments(PaymentID)
);

-- Payments table
CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY,
    UserID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PaymentMethod VARCHAR(50) NOT NULL,
    ContributionID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ContributionID) REFERENCES Contributions(ContributionID)
);
