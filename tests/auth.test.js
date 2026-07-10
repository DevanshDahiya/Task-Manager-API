const request = require("supertest");
const app = require("../app");
require("./setup");

describe("Auth routes", () => {
    test("registers a new user successfully", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                email: "test324@gmail.com",
                password: "12334445",
            });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token");
        expect(res.body.user).not.toHaveProperty("password");
    });

    test("rejects duplicate email registration", async () => {
        await request(app).post("/api/auth/register").send({
            username: "user1",
            email: "dup@gmail.com",
            password: "4543534",
        });

        const res = await request(app).post("/api/auth/register").send({
            username: "test2",
            email: "dup@gmail.com",
            password: "4543534",
        });

        expect(res.statusCode).toBe(400);
    });

    test("log in with correct credentials", async () => {
        await request(app).post("/api/auth/register").send({
            username: "login12",
            email: "login@gmail.com",
            password: "123456",
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "login@gmail.com",
            password: "123456",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    test("rejects login with wrong password", async () => {
        await request(app).post("/api/auth/register").send({
            username: "wrongU",
            email: "wrong@example.com",
            password: "123456",
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "wrong@example.com",
            password: "123454366",
        });

        expect(res.statusCode).toBe(401);
    });
});