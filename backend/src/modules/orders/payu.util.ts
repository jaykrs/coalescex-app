import crypto from "crypto";
import { env } from "@/config/env";

/**
 * PayU request hash sequence (standard, no UDFs beyond udf1-5 left blank):
 * sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 */
export interface PayuRequestParams {
  txnid: string;
  amount: string; // must match order amount exactly, e.g. "499.00"
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
}

function sha512(input: string): string {
  return crypto.createHash("sha512").update(input).digest("hex");
}

export function buildPayuRequest(params: PayuRequestParams) {
  const { txnid, amount, productinfo, firstname, email } = params;
  const hashSequence = [
    env.payu.key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    "", "", "", "", "", // udf1-5
    "", "", "", "", "", // reserved
    env.payu.salt,
  ].join("|");

  const hash = sha512(hashSequence);

  return {
    key: env.payu.key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    phone: params.phone,
    surl: params.surl,
    furl: params.furl,
    hash,
    action: env.payu.baseUrl,
  };
}

/**
 * PayU response hash sequence (reverse order):
 * sha512(SALT|status|||||||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
export interface PayuResponsePayload {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  status: string;
  hash: string;
  [k: string]: string;
}

export function verifyPayuResponseHash(payload: PayuResponsePayload): boolean {
  const baseSequence = [
    payload.status,
    payload.udf10 ?? "",
    payload.udf9 ?? "",
    payload.udf8 ?? "",
    payload.udf7 ?? "",
    payload.udf6 ?? "",
    payload.udf5 ?? "",
    payload.udf4 ?? "",
    payload.udf3 ?? "",
    payload.udf2 ?? "",
    payload.udf1 ?? "",
    payload.email,
    payload.firstname,
    payload.productinfo,
    payload.amount,
    payload.txnid,
    payload.key,
  ].join("|");

  const hashWithoutAdditionalCharges = sha512(`${env.payu.salt}|${baseSequence}`);

  if (payload.additionalCharges) {
    const hashWithAdditionalCharges = sha512(
      `${payload.additionalCharges}|${env.payu.salt}|${baseSequence}`
    );
    return (
      hashWithAdditionalCharges.toLowerCase() === payload.hash.toLowerCase() ||
      hashWithoutAdditionalCharges.toLowerCase() === payload.hash.toLowerCase()
    );
  }

  return hashWithoutAdditionalCharges.toLowerCase() === payload.hash.toLowerCase();
}

export function generateTxnId(): string {
  return `txn_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;
}
