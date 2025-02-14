create table profiles
(
    id              uuid primary key         default uuid_generate_v4(),
    name            text    not null,
    description     text    not null,
    phone           text,
    phone_whatsapp  boolean                  default false,
    phone_telegram  boolean                  default false,
    price           numeric not null,
    age             integer not null,
    payment_methods text[] not null,
    languages       text[] not null,
    image           text    not null,
    location        jsonb   not null,
    address         text    not null,
    display         boolean                  default true,
    verified        boolean                  default false,
    updated_at      timestamp with time zone default timezone('utc'::text, now())
);