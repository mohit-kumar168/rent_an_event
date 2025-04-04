-- MySQL dump for Rent An Even Project

-- Table structure for table `bookings`

DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings` (
  `bookingID` INT AUTO_INCREMENT PRIMARY KEY,
  `bookedBy` VARCHAR(45) NOT NULL,
  `bookedFrom` DATE NOT NULL,
  `bookedTo` DATE NOT NULL,
  `propertyID` INT NOT NULL,
  `NoOfGuests` INT NOT NULL,
  `price` INT NOT NULL
);

-- Sample data for `bookings`
INSERT INTO `bookings` (`bookedBy`, `bookedFrom`, `bookedTo`, `propertyID`, `NoOfGuests`, `price`) VALUES
('gsowmya@gmail.com', '2018-10-01', '2018-10-04', 45, 4, 486);

-- Table structure for table `property`

DROP TABLE IF EXISTS `property`;
CREATE TABLE `property` (
  `uid` INT AUTO_INCREMENT PRIMARY KEY,
  `listedBy` VARCHAR(25) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `sleeps` INT DEFAULT 1,
  `bedrooms` INT,
  `bathrooms` INT,
  `baseRate` INT,
  `country` VARCHAR(45),
  `city` VARCHAR(45),
  `state` VARCHAR(45),
  `zipcode` VARCHAR(45),
  `headline` VARCHAR(100),
  `description` VARCHAR(1000),
  `currency` VARCHAR(3),
  `minStay` INT,
  `amenities` VARCHAR(255),
  `propertyType` VARCHAR(45)
);

-- Sample data for `property`
INSERT INTO `property` (`listedBy`, `startDate`, `endDate`, `sleeps`, `bedrooms`, `bathrooms`, `baseRate`, `country`, `city`, `state`, `zipcode`, `headline`, `description`, `currency`, `minStay`, `amenities`, `propertyType`) VALUES
('partha.murali@gmail.com', '2018-09-30', '2018-10-31', 8, 4, 3, 200, 'USA', 'Sunnyvale', 'California', '94086', 'Serene Family Home', 'Spacious residence with Delta views.', 'USD', 1, 'Internet, Air Conditioning', 'Family Home');

-- Table structure for table `users`

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `email` VARCHAR(45) PRIMARY KEY,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `created` VARCHAR(45) NOT NULL,
  `isOwner` VARCHAR(1) DEFAULT 'N'
);

-- Sample data for `users`
INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `created`, `isOwner`) VALUES
('Sowmya', 'Gowrishankar', 'gsowmya@gmail.com', 'password123', '2018', 'Y'),
('Partha', 'Murali', 'partha.murali@gmail.com', 'password123', '2018', 'Y'),
('Shivani', 'G', 'shivanigowri@gmail.com', 'password123', '2018', 'N');
