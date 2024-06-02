import { sql } from "@vercel/postgres";

export default async function Cart({
  params
} : {
  params: { user: string }
}): Promise<JSX.Element> {
    const { rows } = await sql`
    CREATE TABLE todo2 (
        id BIGINT NOT NULL,
        text VARCHAR(255),
        completed BOOLEAN
    )`;
    


  return (
    <div>Table</div>
  );
}