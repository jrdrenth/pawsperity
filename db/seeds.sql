use paws_db;

-- User
insert into user (id, name, email, password, created_at, updated_at)
values
  (1, 'Admin', 'admin@email.com', '$2b$10$lerHCzJmNIAHd6ZswewoBegwvzKbTuoVkIRgndBr1vXezxgPmexwW', current_timestamp, current_timestamp);

-- PetType
insert into pet_type (id, name)
values 
  (1, 'Dog'),
  (2, 'Cat'),
  (3, 'Rabbit'),
  (4, 'Bird'),
  (5, 'Fish'),
  (6, 'Reptile'),
  (7, 'Rodent'),
  (8, 'Dragon'),
  (9, 'Dinosaur'),
  (10, 'Beast'),
  (12, 'Pokemon');

-- Pet
insert into pet (id, pet_type_id, owner_id, name, dob, gender, created_at, updated_at)
values
  (1, 1, 1, 'Rocco', '2015-09-15', 'male', current_timestamp, current_timestamp);

-- Todo
insert into todo (id, user_id, name, description)
values
  (1, 1, 'Walk Rocco', 'On jeffrey open space trail at least 30 minutes'),
  (2, 1, 'Make appointment for annual vaccinations',''),
  (3, 1, 'Make appointment for haircut', 'Get the puppy cut!');

-- ServiceProvider
insert into service_provider (id, name, phone, info, created_at, updated_at)
values
  (1, 'Northwood Animal Hospital', '(949) 559-1992', '13925 Yale #115\nIrvine, CA 92620', current_timestamp, current_timestamp),
  (2, 'Estrella Pet Grooming', '(949) 496-2968','31105 Rancho Viejo Road\nSan Juan Capistrano, CA 92675', current_timestamp, current_timestamp),
  (3, 'The Spaw','(714) 669-9074', '14712 Franklin Ave., Unit M\nTustin, CA 92780', current_timestamp, current_timestamp);

-- Visit
-- Had to do this funny business when Visit was modeled as a many to many between pet and service_provider, changed it to be two one to manys
-- This was because we want to add multiple visits of the same pet going to the same office, but there was a unique constraint on the composite of those two columns
-- Had to remove the unique constraint, but first it required the foreign key be removed, then re-added foreign key back after
-- /*!40000 ALTER TABLE `service` DISABLE KEYS */;
-- alter table visit drop foreign key visit_ibfk_1;
-- alter table visit drop index visit_service_provider_id_pet_id_unique;
-- /*!40000 ALTER TABLE `service` ENABLE KEYS */;
-- alter table Visit add constraint visit_ibfk_1 foreign key (pet_id) REFERENCES Pet(id);

insert into visit (id, pet_id, service_provider_id, title, worked_with, notes, is_completed, total_cost, date_time)
values
  (1, 1, 2, 'Rocco Grooming', 'Kat', 'Routine Haircut', false, 85.00, '2021-04-12 08:30:00');


-- ServiceCateory
insert into service_category (id, name)
values
  (1, 'Medical'),
  (2,'Grooming'),
  (3,'Pet Watching');

-- Service
insert into service (id, service_category_id, name)
values
  (1, 1, 'Annual Exam'),
  (2, 1, 'Vet Follow-up'),
  (3, 1, 'Check-up'),
  (4, 1, 'Vaccination'),
  (5, 1, 'Surgery'),
  (6, 2, 'Haircut'),
  (7, 2, 'Bath/Cleaning'),
  (8, 2, 'Nail Clipping'),
  (9, 2, 'Tooth Brushing'),
  (10, 3, 'Daycare'),
  (11, 3, 'Boarding');

-- ServiceProvided
insert into service_provided (id, visit_id, service_id, performed_by, notes, price)
values
  (1, 1, 6, 'Kat', 'Puppy Style Cut', 75.00),
  (2, 1, 7, 'Kat', null, null),
  (3, 1, 8, 'Kat', null, null),
  (4, 1, 9, 'Kat', null, 10.00),
  (5, 1, 10, 'Staff', null, null);
