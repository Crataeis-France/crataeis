"use client";

import { useEffect, useMemo, useState, type ComponentProps } from "react";
import { useTranslations } from "next-intl";
// Content
import type { ServiceId } from "@/content/home";
// Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ContactEmailDialogProps = {
  triggerLabel?: string;
  triggerClassName?: string;
  initialServiceId?: ServiceId;
};

type FormValues = {
  name: string;
  email: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const DEFAULT_VALUES: FormValues = {
  name: "",
  email: "",
  service: "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactEmailDialog({
  triggerLabel,
  triggerClassName,
  initialServiceId,
}: ContactEmailDialogProps) {
  const t = useTranslations("HomePage");
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const serviceOptions = useMemo(
    () => [
      t("services.items.web.title"),
      t("services.items.consulting.title"),
      t("services.items.seo.title"),
      t("services.items.googleBusiness.title"),
      t("contactDialog.serviceOther"),
    ],
    [t],
  );

  useEffect(() => {
    if (!open || !initialServiceId) return;
    const label = t(`services.items.${initialServiceId}.title`);
    setValues((prev) => ({ ...prev, service: label }));
  }, [open, initialServiceId, t]);

  function validate(next: FormValues) {
    const nextErrors: FormErrors = {};

    if (!next.name.trim())
      nextErrors.name = t("contactDialog.validation.nameRequired");
    if (!next.email.trim()) {
      nextErrors.email = t("contactDialog.validation.emailRequired");
    } else if (!isValidEmail(next.email.trim())) {
      nextErrors.email = t("contactDialog.validation.emailInvalid");
    }
    if (!next.service.trim()) {
      nextErrors.service = t("contactDialog.validation.serviceRequired");
    }
    if (!next.message.trim()) {
      nextErrors.message = t("contactDialog.validation.messageRequired");
    }

    return nextErrors;
  }

  function updateField<K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const onSubmit = async (
    e: Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0],
  ) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setSubmitError(data.error ?? t("contactDialog.feedback.sendFailed"));
        return;
      }

      setSubmitSuccess(t("contactDialog.feedback.sendSuccess"));
      setValues(DEFAULT_VALUES);
      setErrors({});
    } catch {
      setSubmitError(t("contactDialog.feedback.sendUnexpectedError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className={triggerClassName}>
          {triggerLabel ?? t("nav.consultation")}
        </Button>
      </DialogTrigger>

      <DialogContent className="border-white/10 bg-mkt-surface-container text-mkt-on-surface sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("contactDialog.title")}</DialogTitle>
          <DialogDescription className="text-mkt-on-surface-variant">
            {t("contactDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          className="space-y-5"
          autoComplete="off"
          data-bwignore="true"
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="contact"
        >
          <FieldGroup>
            <Field>
              <Label htmlFor="contact-name">
                {t("contactDialog.labels.name")} *
              </Label>
              <Input
                id="contact-name"
                name="crataeis-full-name"
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder={t("contactDialog.placeholders.name")}
                autoComplete="off"
                data-bwignore="true"
                data-lpignore="true"
                data-1p-ignore="true"
                required
                aria-invalid={!!errors.name}
              />
              <FieldError>{errors.name}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="contact-email">
                {t("contactDialog.labels.email")} *
              </Label>
              <Input
                id="contact-email"
                name="crataeis-reply-mail"
                type="text"
                inputMode="email"
                autoCapitalize="none"
                spellCheck={false}
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder={t("contactDialog.placeholders.email")}
                autoComplete="off"
                data-bwignore="true"
                data-lpignore="true"
                data-1p-ignore="true"
                required
                aria-invalid={!!errors.email}
              />
              <FieldError>{errors.email}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="contact-service">
                {t("contactDialog.labels.service")} *
              </Label>
              <Select
                value={values.service}
                onValueChange={(value) => updateField("service", value)}
              >
                <SelectTrigger
                  id="contact-service"
                  className="w-full"
                  data-bwignore="true"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  aria-invalid={!!errors.service}
                >
                  <SelectValue
                    placeholder={t("contactDialog.placeholders.service")}
                  />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-mkt-surface-container text-mkt-on-surface">
                  {serviceOptions.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError>{errors.service}</FieldError>
            </Field>

            <Field>
              <Label htmlFor="contact-message">
                {t("contactDialog.labels.message")} *
              </Label>
              <Textarea
                id="contact-message"
                name="crataeis-message"
                value={values.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder={t("contactDialog.placeholders.message")}
                className="min-h-32"
                autoComplete="off"
                data-bwignore="true"
                data-lpignore="true"
                data-1p-ignore="true"
                required
                aria-invalid={!!errors.message}
              />
              <FieldError>{errors.message}</FieldError>
            </Field>
          </FieldGroup>

          {submitError ? (
            <p className="text-sm text-destructive">{submitError}</p>
          ) : null}
          {submitSuccess ? (
            <p className="text-sm text-green-600 dark:text-green-400">
              {submitSuccess}
            </p>
          ) : null}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-mkt-indigo-brand text-white hover:bg-indigo-500"
            >
              {isSubmitting
                ? t("contactDialog.actions.sending")
                : t("contactDialog.actions.submit")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
