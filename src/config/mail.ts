interface IMailConfig {
  driver: 'ethereal' | 'gmail';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'gobarber.ivbc@gmail.com',
      name: 'GoBarber IVBC',
    },
  },
} as IMailConfig;
