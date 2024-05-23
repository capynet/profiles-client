# Credentials:

Supabase

Project:
escorts-malaga / 3@Jyk!2gwNyb5G4

Project API keys

Anon / public : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cXJrbnp2emhlcnV6b25sbGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwNjQ3NDQsImV4cCI6MjAxNTY0MDc0NH0.lJ8QKHoK4lawKOhNjuznERbe2A1EIg5oEw-77SpS3DY

Secreta (no usar nuca del cliente) eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cXJrbnp2emhlcnV6b25sbGllIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDA2NDc0NCwiZXhwIjoyMDE1NjQwNzQ0fQ.yqiY2XmL3qRaCjaaDhEAxeXmPPadwfu38xsAMSI-BI4

url: https://duqrknzvzheruzonllie.supabase.co

callback url para supabase https://duqrknzvzheruzonllie.supabase.co/auth/v1/callback
/home/capy/www/profiles/client/misc/credentials.json esta guardado por las dudas. no es que lo use.


SQL functions
Enabled ones can be found here: https://supabase.com/dashboard/project/duqrknzvzheruzonllie/database/functions?schema=public

```sql
create or replace function get_product(user_input products.user%TYPE) returns table (
  id products.id%TYPE,
  created_at products.created_at%TYPE, 
  name products.name%TYPE, 
  description products.description%TYPE, 
  published products.published%TYPE, 
  verified products.verified%TYPE, 
  updated_at products.updated_at%TYPE,
  location text[]
  ) as $$
  select 
  id, 
  created_at,
  name, 
  description,
  published,
  verified,
  updated_at,
  array[ST_Y(location::geometry), ST_X(location::geometry)] as location
	from products where products.user = user_input;
$$ language sql;
```