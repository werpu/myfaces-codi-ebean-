SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists o_address;

drop table if exists o_entry;

drop table if exists group;

drop table if exists o_person;

drop table if exists security;

drop table if exists security_group;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists o_address_seq;

drop sequence if exists o_entry_seq;

drop sequence if exists group_seq;

drop sequence if exists o_person_seq;

drop sequence if exists security_seq;

