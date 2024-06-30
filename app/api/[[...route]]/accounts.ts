import { string, z } from 'zod'
import { Hono } from 'hono';;
import { db } from '@/db/drizzle';
import { accounts, insertAccountsSchema } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { and, eq, inArray } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { createId } from '@paralleldrive/cuid2';



const app = new Hono().get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({
            error: "Unauthorized"
        }, 401)
    }
    const data = await db.select({ id: accounts.id, name: accounts.name }).from(accounts).where(eq(accounts.userId, auth.userId))

    return c.json({
        data
    })
}).get("/:id", clerkMiddleware(), zValidator("param", z.object({ id: z.string() })), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({
            error: "Unauthorized"
        }, 401)
    }
    const { id } = c.req.valid('param');
    if (!id) {
        return c.json({ error: "Missing Id" }, 400)
    }
    const [data] = await db.select({ id: accounts.id, name: accounts.name }).from(accounts).where(
        and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id)
        )
    )

    return c.json({
        data
    })
})
    .post("/", clerkMiddleware(), zValidator("json", insertAccountsSchema.pick({
        name: true,
    })), async (c) => {
        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorized"
            }, 401)
        }
        const values = c.req.valid("json")
        const [data] = await db.insert(accounts).values({
            id: createId(),
            userId: auth.userId,
            ...values
        }).returning()


        return c.json({
            data
        })
    }).post("/deleteMultipleId", clerkMiddleware(), zValidator(
        'json',
        z.object({
            ids: z.array(z.string())
        })
    ), async (c) => {

        const values = c.req.valid('json')
        const auth = getAuth(c)
        if (!auth?.userId) {
            return c.json({ error: "UnAuthrized" }, 401)
        }
        await db.delete(accounts).where(
            and(
                eq(accounts.userId, auth.userId),
                inArray(accounts.id, values.ids)
            )
        )
        return c.json({
            data: {}
        })
    }).patch("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string()
    })), zValidator("json", insertAccountsSchema.pick({
        name: true
    })), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid("param")
        const values = c.req.valid("json");
        if (!id) {
            return c.json({ error: "Missing ID" }, 400)
        }
        if (!auth?.userId) {
            return c.json({ error: "UnAuthrized" }, 401)
        }
        const [data] = await db.update(accounts).set(values).where(
            and(
                eq(accounts.userId, auth?.userId + ""),// for string conversion
                eq(accounts.id, id)
            )
        ).returning();
        if (!data) {
            return c.json({ "error": "Not found" }, 404)
        }
        return c.json({
            data
        })
    }).delete("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string().optional()
    })), async (c) => {
        const auth = getAuth(c)

        if (!auth?.userId) {
            return c.json({
                error: "UnAuthrized",
            }, 400)
        }
        const { id } = c.req.valid("param");
        const [data] = await db.delete(accounts).where(
            and(eq(accounts.userId, auth.userId), eq(accounts.id, id + ""))
        ).returning({
            id: accounts.id
        });
        if (!data) {
            return c.json({
                error: 'Invalid Id'
            }, 400)
        }
        return c.json({
            data
        })


    })


export default app