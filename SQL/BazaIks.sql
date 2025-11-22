/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.32 : Database - iks
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`iks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `iks`;

/*Table structure for table `chat` */

DROP TABLE IF EXISTS `chat`;

CREATE TABLE `chat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idParticipant1` bigint NOT NULL,
  `idParticipant2` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Razgovor_Korisnik1_idx` (`idParticipant1`),
  KEY `fk_Razgovor_Korisnik2_idx` (`idParticipant2`),
  CONSTRAINT `fk_Razgovor_Korisnik1` FOREIGN KEY (`idParticipant1`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_Razgovor_Korisnik2` FOREIGN KEY (`idParticipant2`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idUser` bigint NOT NULL,
  `idPost` bigint NOT NULL,
  `Content` text,
  PRIMARY KEY (`id`),
  KEY `fk_Komentar_Korisnik1_idx` (`idUser`),
  KEY `fk_Komentar_Objava1_idx` (`idPost`),
  CONSTRAINT `fk_Komentar_Korisnik1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_Komentar_Objava1` FOREIGN KEY (`idPost`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3;

/*Table structure for table `follower` */

DROP TABLE IF EXISTS `follower`;

CREATE TABLE `follower` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idFollower` bigint NOT NULL,
  `idFollowed` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Pratitelji_Korisnik1_idx` (`idFollower`),
  KEY `fk_Pratitelji_Korisnik2_idx` (`idFollowed`),
  CONSTRAINT `fk_Pratitelji_Korisnik1` FOREIGN KEY (`idFollower`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_Pratitelji_Korisnik2` FOREIGN KEY (`idFollowed`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idChat` bigint NOT NULL,
  `idSender` bigint NOT NULL,
  `Content` text,
  `TimeOfMessage` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Poruka_Razgovor1_idx` (`idChat`),
  KEY `fk_Poruka_Korisnik1_idx` (`idSender`),
  CONSTRAINT `fk_Poruka_Korisnik1` FOREIGN KEY (`idSender`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_Poruka_Razgovor1` FOREIGN KEY (`idChat`) REFERENCES `chat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `idUser` bigint NOT NULL,
  `Content` text,
  `Visibility` enum('public','followers','private') DEFAULT NULL,
  `DateOfPosting` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Objava_Korisnik_idx` (`idUser`),
  CONSTRAINT `fk_Objava_Korisnik` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb3;

/*Table structure for table `rating` */

DROP TABLE IF EXISTS `rating`;

CREATE TABLE `rating` (
  `idPost` bigint NOT NULL,
  `idUser` bigint NOT NULL,
  `Value` tinyint DEFAULT NULL,
  PRIMARY KEY (`idPost`,`idUser`),
  KEY `fk_ObjavaLikeDislike_Korisnik1_idx` (`idUser`),
  CONSTRAINT `fk_ObjavaLike_Objava1` FOREIGN KEY (`idPost`) REFERENCES `post` (`id`),
  CONSTRAINT `fk_ObjavaLikeDislike_Korisnik1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) DEFAULT NULL,
  `Password` text,
  `Name` varchar(45) DEFAULT NULL,
  `Surname` varchar(45) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `IsAdmin` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
)ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;

/* Procedure structure for procedure `EditPost` */

/*!50003 DROP PROCEDURE IF EXISTS  `EditPost` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `EditPost`(idPost_ INT, content_ TEXT, visibility_ varchar(10))
BEGIN
	UPDATE post
	SET Content = content_, Visibility = visibility_
	WHERE id = idPost_;
END */$$
DELIMITER ;

/* Procedure structure for procedure `EditProfile` */

/*!50003 DROP PROCEDURE IF EXISTS  `EditProfile` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `EditProfile`(idKorisnik_ INT, username_ varchar(45))
BEGIN
	UPDATE user
	SET Username = username_
	WHERE id = idKorisnik_;
END */$$
DELIMITER ;

/* Procedure structure for procedure `Follow` */

/*!50003 DROP PROCEDURE IF EXISTS  `Follow` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `Follow`(idFollower_ INT, idFollowed_ INT)
BEGIN
	INSERT INTO follower (idFollower, idFollowed) VALUES (idFollower_, idFollowed_);
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetChat` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetChat` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetChat`(idChat_ INT)
BEGIN
	SELECT * FROM message WHERE idChat = idChat_ ORDER BY id DESC;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetChats` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetChats` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetChats`(idParticipant1_ INT)
BEGIN
	SELECT ch.id as idChat, u1.id as idUser1, u1.Username as username1, u2.id as idUser2, u2.Username as username2, m.TMS, m1.Content FROM chat ch
    LEFT OUTER JOIN user u1 ON u1.id = ch.idParticipant1
    LEFT OUTER JOIN user u2 ON u2.id = ch.idParticipant2
    LEFT OUTER JOIN (SELECT idChat, MAX(TimeOfMessage) as TMS FROM message GROUP BY idChat) m ON m.idChat = ch.id
    LEFT OUTER JOIN (SELECT * FROM message) m1 ON m1.TimeOfMessage = m.TMS
    WHERE ch.idParticipant1 = idParticipant1_ OR ch.idParticipant2 = idParticipant1_
    order by m.TMS desc;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetComments` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetComments` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetComments`(idPost INT)
BEGIN
	SELECT u.id, u.Username, c.Content FROM comment c
	LEFT OUTER JOIN post p on c.idPost=p.id
	LEFT OUTER JOIN user u on u.id = c.idUser
	WHERE c.idPost = idPost
	GROUP BY c.id;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetFollowed` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetFollowed` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFollowed`(idUser INT)
BEGIN
	SELECT u.id, u.Username, u.Name, u.Surname FROM follower f
	LEFT OUTER JOIN user u on u.id = f.idFollowed
	WHERE f.idFollower = idUser
    GROUP BY f.idFollowed;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetFollowers` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetFollowers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFollowers`(idUser INT)
BEGIN
	SELECT u.id, u.Username, u.Name, u.Surname FROM follower f
	LEFT OUTER JOIN user u on u.id = f.idFollower
    WHERE f.idFollowed = idUser
	GROUP BY f.idFollower;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetPost` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetPost` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPost`(idUser_ INT)
BEGIN
	SELECT u.id as UserID, u.username as Username, p.id as PostID, p.Content, p.Visibility, p.DateOfPosting, kom.Numbers AS Comments, IF(COUNT(r.idUser)=0, 0, SUM(r.Value)) AS Rating FROM post p
	LEFT OUTER JOIN user u ON p.idUser = u.id
	LEFT OUTER JOIN (SELECT c.idPost, COUNT(c.id) as Numbers FROM comment c GROUP BY c.idPost) kom ON kom.idPost = p.id
	LEFT OUTER JOIN rating r ON r.idPost = p.id
	WHERE p.Visibility = "public" OR (p.Visibility = "followers" 
    AND u.id IN (SELECT f.idFollowed FROM follower f
				JOIN user u ON f.idFollower = u.id
				WHERE f.idFollower = idUser_
				GROUP BY f.id))
	GROUP BY p.id;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetPostFollowed` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetPostFollowed` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPostFollowed`(idUser_ INT)
BEGIN
	SELECT u.id as UserID, u.Username, p.id as PostID, p.Content, p.Visibility, p.DateOfPosting, kom.Numbers AS Comments, IF(COUNT(r.idUser)=0, 0, SUM(r.Value)) AS Rating FROM post p
	LEFT OUTER JOIN user u ON p.idUser = u.id
	LEFT OUTER JOIN (SELECT c.idPost, COUNT(c.id) as Numbers FROM comment c GROUP BY c.idPost) kom ON kom.idPost = p.id
	LEFT OUTER JOIN rating r ON r.idPost = p.id
	WHERE p.Visibility != "private" 
    AND u.id IN (SELECT f.idFollowed FROM follower f
				JOIN user u ON f.idFollower = u.id
				WHERE f.idFollower = idUser_
				GROUP BY f.id)
	GROUP BY p.id;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetProfile` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetProfile` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetProfile`(idUser_ INT)
BEGIN
    SELECT u.id, u.Username, u.Name, u.Surname, u.DateOfBirth, (SELECT count(*) FROM follower f
    WHERE f.idFollower=idUser_) as Following, 
    (SELECT count(*) FROM follower f
    WHERE f.idFollowed=idUser_) as Followers FROM user u WHERE u.id = idUser_;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetProfilePosts` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetProfilePosts` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetProfilePosts`(idUser_ INT)
BEGIN
	SELECT p.id as PostID, p.Content, p.Visibility, p.DateOfPosting, SUM(r.Value) as Rating, kom.Numbers as Comments FROM post p
	LEFT OUTER JOIN user u ON u.id = p.idUser
    LEFT OUTER JOIN rating r ON r.idPost = p.id
    LEFT OUTER JOIN (SELECT c.idPost, COUNT(c.id) as Numbers FROM comment c GROUP BY c.idPost) kom ON kom.idPost = p.id
	WHERE u.id = idUser_
    GROUP BY p.id;
END */$$
DELIMITER ;

/* Procedure structure for procedure `GetRatings` */

/*!50003 DROP PROCEDURE IF EXISTS  `GetRatings` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRatings`(idUser_ INT)
BEGIN
	SELECT r.idPost, r.Value FROM rating r
    WHERE r.idUser = idUser_;
END */$$
DELIMITER ;

/* Procedure structure for procedure `MakeChat` */

/*!50003 DROP PROCEDURE IF EXISTS  `MakeChat` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `MakeChat`(in idParticipant1_ INT, in idParticipant2_ INT)
BEGIN
	declare chatId int;
	
	select id into chatId from chat where
	(idParticipant1 = idParticipant1_ and idParticipant2 = idParticipant2_)
	or (idParticipant2 = idParticipant1_ and idParticipant1 = idParticipant2_);
	
	if chatId is not null then
		select chatId;
	else
		INSERT INTO chat (idParticipant1, idParticipant2) VALUES (idParticipant1_, idParticipant2_);
		
		SELECT id as chatId FROM chat WHERE
		(idParticipant1 = idParticipant1_ AND idParticipant2 = idParticipant2_);
	end if;
END */$$
DELIMITER ;

/* Procedure structure for procedure `MakeComment` */

/*!50003 DROP PROCEDURE IF EXISTS  `MakeComment` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `MakeComment`(idUser_ INT, idPost_ INT, content_ text)
BEGIN
	INSERT INTO comment (idUser, idPost, Content) 
    VALUES (idUser_, idPost_, content_);
END */$$
DELIMITER ;

/* Procedure structure for procedure `MakeMessage` */

/*!50003 DROP PROCEDURE IF EXISTS  `MakeMessage` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `MakeMessage`(idChat_ INT, idSender_ INT, content_ TEXT)
BEGIN
	INSERT INTO message (idChat, idSender, Content, TimeOfMessage) VALUES (idChat_, idSender_, content_, NOW());
END */$$
DELIMITER ;

/* Procedure structure for procedure `MakePost` */

/*!50003 DROP PROCEDURE IF EXISTS  `MakePost` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `MakePost`(idUser_ INT, content_ text, visibility_ varchar(10))
BEGIN
	INSERT INTO Post (idUser, Content, Visibility, DateOfPosting) 
    VALUES (idUser_, content_, visibility_, NOW());
END */$$
DELIMITER ;

/* Procedure structure for procedure `RatePost` */

/*!50003 DROP PROCEDURE IF EXISTS  `RatePost` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `RatePost`(idUser_ INT, idPost_ INT, value_ INT)
BEGIN
	INSERT INTO rating (idPost, idUser, VALUE) VALUES (idPost_, idUser_, value_);
END */$$
DELIMITER ;

/* Procedure structure for procedure `RegisterUser` */

/*!50003 DROP PROCEDURE IF EXISTS  `RegisterUser` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `RegisterUser`(username_ VARCHAR(45), password_ TEXT, name_ VARCHAR(45), surname_ VARCHAR(45), dateofbirth_ DATE)
BEGIN
	INSERT INTO USER (Username, PASSWORD, NAME, surname, DateOfBirth) VALUES 
	(username_, password_, name_, surname_, dateofbirth_);
END */$$
DELIMITER ;

/* Procedure structure for procedure `Unfollow` */

/*!50003 DROP PROCEDURE IF EXISTS  `Unfollow` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `Unfollow`(idFollower_ INT, idFollowed_ INT)
BEGIN
	DELETE FROM follower WHERE idFollower = idFollower_ and idFollowed = idFollowed_;
END */$$
DELIMITER ;

/* Procedure structure for procedure `UnratePost` */

/*!50003 DROP PROCEDURE IF EXISTS  `UnratePost` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `UnratePost`(idUser_ INT, idPost_ INT)
BEGIN
	DELETE FROM rating r
    WHERE r.idPost = idPost_ and idUser = idUser_;
END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
