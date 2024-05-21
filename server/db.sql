create table subjects (
	subject_code serial PRIMARY KEY,
	subject_name VARCHAR(100) NOT null,
	syllabus_link VARCHAR(200) NOT NULL
);

alter table subjects alter column subject_code type varchar(50);

create table department_subjects_mapping(
	department_code varchar(200) not null,
	subject_code varchar(200) null null,
	constraint fk_subjects_department_sc foreign key (subject_code) references subjects(subject_code)
);

create table departments(
	department_code char(20) primary key,
	department_name varchar(200) not null
);


create table users(
	id serial primary key,
	"name" varchar(200) not null,
	email varchar(200) not null,
	phone char(10),
	"password" varchar(200) not null,
	"role" varchar(20) not null,
	status varchar(20) not null,
	email_verified  boolean default false
);

create table batches(
	batch_code varchar(100) primary key,
	department_code char(20) not null,
	"name" varchar(200) not null,
	start_year char(4) not null,
	end_year char(4) NOT NULL,
	status varchar(20) not null,
	constraint fk_batches_departments_department_code foreign key (department_code) references departments(department_code)
);



create table students(
	roll_number varchar(50) primary key, 
	user_id int not null,
	gender varchar(200),
	batch_code varchar(100),
	constraint fk_students_batches_batch_code foreign key (batch_code) references batches(batch_code),
	constraint fk_students_users_user_id foreign key (user_id) references users(id)
);


create table attendance_log(
	id serial primary key,
	"time_stamp" TIMESTAMP NOT null default CURRENT_TIMESTAMP,
    batch_code varchar(100) not null,
    subject_code varchar(200) null null,
    teacher_id INT NOT null,
    remarks varchar(500) not null,
    constraint fk_batches_attendance_log_batch_code foreign key (batch_code) references batches(batch_code),
    constraint fk_subjects_attendance_log_subject_code foreign key (subject_code) references subjects(subject_code),
    constraint fk_attendance_log_users_teacher_id foreign key (teacher_id) references users(id)
);


create table student_attendance_log(
	id serial primary key,
	log_id int not null,
	roll_number varchar(50) not null,
	isPresent boolean default false,
	batch_code varchar(100) not null,
	subject_code varchar(200) null null,
	constraint fk_student_attendance_log_attendance_log_log_id foreign key (log_id) references attendance_log(id),
	constraint fk_student_attendance_log_students_roll_no foreign key (roll_number) references students(roll_number),
	constraint fk_student_attendance_log_batches_batch_code foreign key (batch_code) references batches(batch_code),
	constraint fk_student_attendance_log_subjects_subject_code foreign key (subject_code) references subjects(subject_code)
);


create table subject_teacher_mapping(
	batch_code varchar(100) not null,
	subject_code varchar(200) null null,
	teacher_id INT NOT null,
	constraint fk_batches_subject_teacher_mapping_batch_code foreign key (batch_code) references batches(batch_code),
	constraint fk_subjects_subject_teacher_mapping_subject_code foreign key (subject_code) references subjects(subject_code),
	constraint fk_subject_teacher_mapping_users_teacher_id foreign key (teacher_id) references users(id)
);
