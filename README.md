# Supabase-datasource
<img src="https://bookface-images.s3.amazonaws.com/logos/08f3d41684b91f7d68810459b2356ecb4819c382.png" />

Perform CRUD operations in Supabase

Includes:
 - Insert (Create)
 - Select (Read)
 - Upsert
 - Update
 - Delete
 
Official docs here: https://supabase.com/docs/reference/javascript/select

# Documentation

## Connecting

Provide a URL and API Key to connect:

<img width="620" alt="Screenshot 2023-04-13 at 18 44 04" src="https://user-images.githubusercontent.com/101575380/231841457-6fef63ad-3e08-4d51-96f2-53a6c15cc885.png">

These can be found within your project page in Supabase:

<img width="429" alt="Screenshot 2023-04-13 at 18 45 21" src="https://user-images.githubusercontent.com/101575380/231841751-a694795a-19e9-4ef6-8377-8f8c081c30de.png">

Click on the settings cog along the left-hand side:

![Screenshot 2023-04-17 at 12 05 15](https://user-images.githubusercontent.com/101575380/232466657-3bc553eb-62eb-4d40-833b-7dadc0408454.png)

Finally click on `API` to see the project URL and project API keys:

![Screenshot 2023-04-17 at 12 06 51](https://user-images.githubusercontent.com/101575380/232466984-141225e8-eb57-43cf-8be0-ab61c607924f.png)

----

## Usage

When pulling data from a table you must provide the name of the table, but also the names of the columns that you want to return.

To return all columns simply enter `*`.

![Screenshot 2023-04-17 at 12 18 35](https://user-images.githubusercontent.com/101575380/232469505-5e278388-34eb-40f6-8c06-11b7000b74db.png)

Note that we are returning *data.data* in the transformer. You can return just *data* if you need access to the status code and message.

### Filters

![Screenshot 2023-04-17 at 12 20 05](https://user-images.githubusercontent.com/101575380/232469797-fea703cc-798e-47fd-a0e8-912fefbe6e6f.png)

If you provide a *Filter column* then a filter will be applied based on the chosen operator and comparison value. There is a large list of available operators, detailed for which can be found [here](https://supabase.com/docs/reference/javascript/using-filters).

![Screenshot 2023-04-17 at 12 21 51](https://user-images.githubusercontent.com/101575380/232470127-9b59f6fe-ec98-44c2-b4ee-485658d62d16.png)
