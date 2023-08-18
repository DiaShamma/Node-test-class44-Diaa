//movieController.test.js
import request from 'supertest';
import app from '../app.js';


describe("Movie Endpoints", () => {
  it("should get the list of movies", async () => {
    const res = await request(app).get("/movie");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should add a new movie", async () => {
    const newMovie = {
      title: "New Movie",
      director: "Director Name",
      release_date: "2023-08-16",
    };
    const res = await request(app).post("/movie").send(newMovie);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Movie added successfully.");
    expect(res.body).toHaveProperty("id");
  });

  it("should handle adding a movie with missing fields", async () => {
    const invalidMovie = {
      title: "Invalid Movie",
      // Missing 'director' and 'release_date'
    };

    const res = await request(app).post("/movie").send(invalidMovie);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error");
  });

});
