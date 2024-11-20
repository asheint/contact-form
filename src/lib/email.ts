"use server"

import { z } from "zod"
import { formSchema } from "./schemas"
import { Resend } from 'resend';
import { EmailTemplate } from "@/components/ui/emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL;

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
    const { data, error } = await resend.emails.send({
        from: `Acme <${fromEmail}>`,
        to: [emailFormData.email],
        subject: 'Hello world',
        react: EmailTemplate({ firstName: emailFormData.firstName }),
    });
    console.log(data);
    if (error) {
        throw(error);
    }
};