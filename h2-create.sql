create table o_address (
  id                        bigint not null,
  street                    varchar(255),
  house_number              varchar(255),
  house                     varchar(255),
  door                      varchar(255),
  zip_code                  varchar(255),
  city                      varchar(255),
  country                   varchar(255),
  region                    varchar(255),
  address_type              integer,
  person_id                 bigint,
  version                   bigint not null,
  constraint pk_o_address primary key (id))
;

create table o_entry (
  id                        bigint not null,
  title                     varchar(255),
  short_desc                varchar(255),
  long_desc                 varchar(255),
  poster_id                 bigint,
  version                   integer not null,
  constraint pk_o_entry primary key (id))
;

create table o_person (
  id                        bigint not null,
  first_name                varchar(255),
  last_name                 varchar(255),
  nick_name                 varchar(255),
  version                   bigint not null,
  constraint pk_o_person primary key (id))
;

create table o_secgroup (
  id                        bigint not null,
  group_type                integer,
  group_name                varchar(255),
  description               varchar(255),
  version                   bigint not null,
  constraint pk_o_secgroup primary key (id))
;

create table security (
  id                        bigint not null,
  owner_id                  bigint,
  user_name                 varchar(255),
  password                  varchar(255),
  constraint pk_security primary key (id))
;


create table security_secgroup (
  security_id                    bigint not null,
  o_secgroup_id                  bigint not null,
  constraint pk_security_secgroup primary key (security_id, o_secgroup_id))
;
create sequence o_address_seq;

create sequence o_entry_seq;

create sequence o_person_seq;

create sequence o_secgroup_seq;

create sequence security_seq;

alter table o_address add constraint fk_o_address_person_1 foreign key (person_id) references o_person (id) on delete restrict on update restrict;
create index ix_o_address_person_1 on o_address (person_id);
alter table o_entry add constraint fk_o_entry_poster_2 foreign key (poster_id) references o_person (id) on delete restrict on update restrict;
create index ix_o_entry_poster_2 on o_entry (poster_id);
alter table security add constraint fk_security_owner_3 foreign key (owner_id) references o_person (id) on delete restrict on update restrict;
create index ix_security_owner_3 on security (owner_id);



alter table security_secgroup add constraint fk_security_secgroup_security_01 foreign key (security_id) references security (id) on delete restrict on update restrict;

alter table security_secgroup add constraint fk_security_secgroup_o_secgro_02 foreign key (o_secgroup_id) references o_secgroup (id) on delete restrict on update restrict;
