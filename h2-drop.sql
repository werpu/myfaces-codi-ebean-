SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists o_address;

drop table if exists o_entry;

drop table if exists o_person;

drop table if exists o_secgroup;

drop table if exists security;

SET REFERENTIAL_INTEGRITY TRUE;

drop sequence if exists o_address_seq;

drop sequence if exists o_entry_seq;

drop sequence if exists o_person_seq;

drop sequence if exists o_secgroup_seq;

drop sequence if exists security_seq;

