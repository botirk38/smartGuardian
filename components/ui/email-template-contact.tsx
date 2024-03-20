interface EmailContactTemplateProps {

  message: string;
  firstName: string;
  lastName: string;

}

export const EmailContactTemplate: React.FC<EmailContactTemplateProps> = ({ message, firstName, lastName }) => {
  return (
    <section>
      Hi my name is {firstName + " " + lastName}
      {message}
    </section>
  );
};

