import { Env as MainEnv } from "../../const/env";

const mainApiBase = MainEnv.API_URL.replace(/\/+$/, "");

export const API_BASE: string = `${mainApiBase}/trade-gpt`;

export const GOOGLE_CLIENT_ID: string = MainEnv.GOOGLE_CLIENT_ID ?? "";

export const IS_DEV: boolean = import.meta.env.DEV;

export const IS_PROD: boolean = import.meta.env.PROD;
