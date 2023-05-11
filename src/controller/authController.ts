import express, { Express, Request, Response } from 'express';


export function login(req: Request, res: Response) {
    try {
        res.send("user have access to application");

    } catch (e) {
        return res.send("Some thing bad/ NetworkDown");
    }
};





