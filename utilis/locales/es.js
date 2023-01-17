const es = {
  translation: {
    errors: {
      login: 'Email y contraseña inválidos',
      token: {
        title: 'Hace tiempo que no nos vemos',
        subtitle: 'Por favor ingrese su email y contraseña',
      },
      email: {
        title: 'Email ya existe',
        subtitle:
          'Por favor intente con otro correo electrónico. De lo contrario, regrese a la página principal y restablezca su contraseña',
      },
      phone: {
        title: 'Número de teléfono falló',
        subtitle:
          'Vale la pena confirmar que la información esta correcta, y luego intentar de nuevo',
      },
      regist: {
        title: 'Falló',
        subtitle:
          'Vale la pena confirmar que la información esta correcta, y luego intentar de nuevo',
      },
      verify: {
        title: 'Código incorrecto',
        subtitle:
          'Asegurese de que haya ingresado el código que recibió más recientemente, y luego intentar de nuevo ',
      },
      typical: {
        title: 'Perdón, ocurrió un error',
        subtitle: 'Por favor inténtelo de nuevo',
        subtitleWithMail:
          'Por favor inténtelo de nuevo. Si el error persiste, póngase en contacto con support@letsongo.com',
        subtitleResend: 'Por favor seleccione "enviar un código nuevo" para intentar otra vez',
      },
      joinCode: {
        title: 'Código no reconocido',
        subtitle: 'Confirme que el código proporcionado es correcto',
      },
      load: {
        title: 'Contenido no disponible',
        subtitle:
          'Actualizar pantalla para intentar de nuevo. Si el error persiste, póngase en contacto con support@letsongo.com',
      },
      notSaved: {
        title: 'No se pudo guardar su información',
        subtitle: 'Por favor inténtelo de nuevo',
      },
      join: {
        title: 'Evento no disponible',
        subtitle:
          'Por favor inténtelo de nuevo. Si el error persiste, póngase en contacto con support@letsongo.com',
      },
    },
    tabBar: {
      test: 'Prueba casera de COVID-19',
      event: 'Eventos 2Gather',
      vaccine: 'Subir tarjeta de vacunación',
      buy: {
        title: 'Comprar pruebas',
        subTitle: 'Tienda virtual de On/Go',
      },
    },
    button: {
      continue: 'Continuar',
      setPass: 'Establecer contraseña',
      verify: 'Verificar',
      save: 'Guardar',
    },
    bioType: {
      fingerPrint: 'Fingerprint',
      touch: 'Touch ID',
      face: 'reconocimiento facial',
    },
    placeholder: {
      pass: 'Contraseña',
      email: 'Correo electrónico',
      zip: 'Código postal',
      firstName: 'Primer nombre',
      lastName: 'Apellido',
      birthday: 'Cumpleaños',
      height: 'Altura',
      weight: 'Peso (lb)',
      address1: 'Dirección 1',
      address2: 'Dirección 2',
      city: 'Ciudad',
      state: 'Estado',
      zipCode: 'Código postal',
      phone: 'Teléfono',
      address: 'Dirección',
      emailOnly: 'Correo electrónico',
    },
    userCommon: {
      first: 'Nombre',
      middle: 'Segundo nombre',
      last: 'Apellido',
      height: 'Altura',
      weight: 'Peso (lb)',
    },
    screens: {
      careCard: {
        title: 'Recursos y cuidado para COVID-19',
        subtitle: '¡Manténgase sano y seguro!',
        button: 'Ver Care Solutions',
      },
      carePopup: {
        title: 'Para ayudarle a sentirse mejor pronto...',
        subtitle: 'Hemos juntado varios servicios para ayudarle a salir adelante...',
        row: {
          1: 'Ayuda con que hacer ahora',
          2: 'Cuidado médico con doctors',
          3: 'Recursos para ayudar con sus preguntas',
        },
        footer: 'Y más...',
        buttons: {
          notNow: 'No ahora',
          explore: 'Explorar cuidado',
        },
      },
      vitamin: {
        title: 'Sabia que...',
        paragraphTitle: 'Deficiencia de vitamina D',
        firstParagraph:
          ' puede aumentar el riesgo de infección de COVID-19 y la probabilidad de enfermedad seria*',
        secondParagraph:
          'Desafortunadamente, se estima que el 42% de estadounidenses tienen deficiencia de vitamina D**, y eso fue antes de que la pandemia dejo a todos adentro por 2+ años.',
        thridParagraph:
          'Para ayudar a combatir COVID-19, hemos organizado recursos alrededor de lo que usted puede hacer para evaluar su riesgo personal y mejorar sus niveles de vitamina D.',
        buttons: {
          notNow: 'No ahora',
          learn: 'Explorar más',
        },
        firstLink: '* https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0263069',
        secondLink:
          '** https://www.cantonmercy.org/healthchat/42-percent-of-americans-are-vitamin-d-deficient/',
      },
      vitaminInfo: {
        title: 'Increasing Vitamin D Intake',
        first:
          'Vitamina D es una parte esencial que ayuda a mantener el sistema inmunológico trabajando adecuadamente y puede ayudar a proteger contra el virus de COVID-19.',
        second: 'Deficiencia de vitamina D es mas común para los siguientes individuos*: ',
        p1: '• Individuos de piel obscura',
        p2: '• Personas mayores de 65 años',
        p3: '• Individuos de alto riesgo o inmunocomprometido',
        thrid:
          'Consulte con su medico si usted sospecha que tiene deficiencia de vitamina D. Ellos pueden determinar si una prescripción de vitamina D es necesaria para usted. Por ahora, aquí hay unas sugerencias para poder aumentar su consumo de vitamina D**.',
        rows: {
          1: 'Pase un poco de tiempo bajo el sol',
          2: 'Consuma pescado grasoso (salmón es una buena opción)',
          3: 'Incluya unos champiñones en su ensalada',
          4: 'Coma huevos de desayuno (todo está en las yemas del huevo)',
          5: 'Tome leche de cabra o jugo de naranja',
        },
        firstLink:
          '* https://www.mayoclinic.org/diseases-conditions/coronavirus/expert-answers/coronavirus-and-vitamin-d/faq-20493088',
        secondLink:
          '** https://health.ucdavis.edu/coronavirus/news/headlines/what-is-the-link-between-vitamin-d-levels-and-covid-19/2022/02',
        button: 'Regresar al inicio',
      },
      accSettings: {
        title: 'Configuración de la cuenta',
        edit: 'Editar',
        enable: 'Permitir',
        version: 'Versión de la aplicación',
        deleteAccount: 'Eliminar cuenta',
        requestedDeleteTitle: 'Solicitud para eliminar cuenta en proceso',
        requestedDeleteContent1: 'Enviado {{date}}. Pongase en contacto con ',
        requestedDeleteContent2: 'support@letsongo.com ',
        requestedDeleteContent3: 'si tiene preguntas.',
      },
      home: {
        activity: 'Actividad',
        routine: 'Rutinas',
        passport: 'Pasaporte',
        testTrack: '¡Tu {{test}} en camino!',
        track: 'Pista',
        emptyOrg: {
          title: '¡Esta actualizado!',
          subtitle: 'No olvide que puede tomar una ',
          button: 'prueba en cualquier momento.',
        },
        test: {
          title: 'Prueba casera de COVID-19',
          subtitle: '¡Reciba resultados en minutos!',
          button: 'Comience prueba',
        },
        vaccine: {
          title: 'Subir su tarjeta de vacunas',
          subtitle: 'Encontrar y compartir en cualquier momento.',
        },
        event: {
          title: 'Obtenga una prueba On/Go',
          subtitle: 'Para usted o para su próximo evento',
          footer: '¿Tiene un código de evento o descuento?',
        },
        defaultTask: {
          title: 'Prueba casera de antígeno COVID-19',
          subtitle: '¡Reciba resultados en minutos! ',
          button: 'Comience su prueba',
        },
      },
      intro: {
        step: 'Paso',
      },
      login: {
        alertBio: {
          setup: `Configure {{biotype}}`,
          question: `¿Gusta utilizar {{biotype}} para iniciar sesión mas rápido la próxima vez?`,
          dontAllow: 'No lo permita',
          firstLogin: `Por favor inicie sesión para habilitar {{biotype}}`,
        },
        new: '¿Nuevo usuario?',
        singUp: 'Regístrese',
        loginButt: 'Iniciar sesión',
        forgPass: 'Contraseña olvidada',
      },
      noRedLine: {
        anotherTest: 'Por favor complete otra prueba.',
        exit: 'Salida',
      },
      scanBar: {
        headerQR: 'Escanee el código QR',
        headerTest: 'Escoja prueba',
        getStarted: '¡Perfecto, empecemos! ',
        infoQR:
          'Utilice este lector para escanear el código QR localizado en la parte exterior del paquete de su prueba.',
        manually: {
          title: '¿No tiene un código QR? ',
          button: 'Comience su prueba manualmente',
          chooseTest: '¿Que prueba desea tomar?',
        },
        button: 'Siguiente',
      },
      shop: {
        passport: 'Pasaporte',
        alert: {
          title: 'Pasaporte de salud On/Go',
          subtitle:
            'Otros pueden escanear esta insignia para poder compartir sus resultados mas recientes. Insignia caduca después de 30 minutos.',
        },
        test: 'Estatus de prueba COVID-19',
        vaccine: 'Estatus de vacunación',
        vaccStatus: 'Vacunado',
        fda: 'Autorización de Uso de Emergencia de la FDA',

        share: 'Comparta estatus',
        modal: {
          title: 'Ver pasaporte de salud para',
        },
      },
      singleTest: {
        title: 'RESULTADOS ANTERIORES',
        subtitle: 'Nombre de prueba va aquí',
      },
      started: {
        title: 'Juntos es mejor',
        button: 'Comience',
        haveAccount: '¿Ya tiene una cuenta? ',
        signIn: 'Inicie sesión',
        modal: {
          title:
            'Aplicación debe tener acceso a una red o a WIFI para que la conexión funcione correctamente',
          subtitle:
            'Esta aplicación chequea su conexión de red o estatus de WIFI para asegurar que va a funcionar correctamente, incluyendo guardar los resultados de sus pruebas para que las pueda encontrar en un futuro.',
          button: 'Continuar',
        },
      },
      testingDetails: {
        title: 'Detalles para prueba',
        question: '¿Como esta planeando usar su prueba?',
        personal: {
          title: 'Para uso personal',
          subtitle: 'En casa o en cualquier lugar',
        },
        event: {
          title: 'Para un evento',
          subtitle: 'Planee antes de su evento',
        },
      },
      testResult: {
        covid: 'para COVID-19.',
        title: 'Su prueba ha sido interpretada correctamente. \n Su resultado es',
        sympt: 'Síntomas',
        noSympt: 'No hay síntomas reportados',
        date: 'Fecha y hora',
        next: {
          title: '¿Que sigue?',
          care: 'Care Solutions',
          cdc: 'Vea las guías del CDC',
          another: 'Tome otra prueba',
        },
        positive: {
          type: 'POSITIVO',
        },
        negative: {
          type: 'NEGATIVO',
        },
        invalid: {
          type: 'INVALIDO',
          reason: 'por las siguientes razones: prueba ha caducado.',
        },
      },
      update: {
        title: 'Nueva actualización esta disponible',
        experience: `Para recibir la mejor experiencia, por favor actualice su aplicación con la
        versión actual.`,
        security: `Como medida de seguridad adicional, por favor utilice el enlace de Contraseña Olvidada para
        actualizar su contraseña la primera vez que use la nueva versión.`,
        button: 'Actualizar',
      },
      webView: {
        alert: 'Error, compartir no esta disponible en su plataforma',
      },
      dependent: {
        edit: {
          add: 'Agrege a un dependiente nuevo',
          date: 'Por favor entre su fecha de nacimiento',
          birthday: 'Cumpleaños',
          vaccination: {
            title: 'Tarjeta de vacunación',
            view: 'Ver tarjeta de vacunación',
            upload: 'Suba su tarjeta de vacunación',
          },
          button: 'Guardar',
          modalTitle: '¡Dependiente guardado!',
          modal: {
            delete: 'Eliminar la cuenta del dependiente',
            cancel: 'Cancelar',
          },
          optional: 'Opcional',
        },
        info: {
          alert: {
            title: 'Borrar dependiente',
            subtitle:
              '¿Esta seguro de que quiere borrar a este dependiente? Perderá también el acceso a sus resultados y reportes.',
          },
          basic: 'Información Básica',
          routine: 'Rutinas',
          org: 'Organizaciones',
          modal: {
            delete: 'Borrar dependiente',
            cancel: 'Cancelar',
          },
        },
      },
      newPass: {
        firstRow: 'Por favor introduzca una nueva',
        secondRow: 'contraseña abajo',
        char: '• 8+ caracteres',
        symb: '• 1 símbolo',
        upper: '• 1 mayúscula',
        numb: '• 1 numero',
        placeholder: 'Entre contraseña de nuevo',
        button: 'Configure la clave',
      },
      org: {
        activeRout: 'Rutinas activas',
        listHeader: 'Organizaciones',
      },
      proctoring: {
        end: 'Acabar Sesión',
        live: {
          header: 'Apoyo en vivo',
          chat: 'La aplicación utiliza audio y micrófono para hacer que el chat con un Care Guide (guía de cuidado) sea disponible.',
          speak:
            'Esta aplicación utiliza su audio y micrófono para permitir que usted pueda platicar con un Care Guide (guía de cuidado).',
          button: 'Continuar',
        },
        cameraTitle: 'Confirme que esta satisfecho con su video antes de continuar',
        modal: {
          title: 'Llamada completada',
          descr:
            'Gracias por conectarse. Usted recibirá un correo de parte de Care Solutions muy pronto',
        },
      },
      question: {
        first: {
          title: '¿Usted toma más de 10 mg al día de suplementos de biotina (Vitamina B7)?',
          subtitle: `Niveles altos de biotina (>10 mg por día) pueden interferir con esta prueba. Si no esta seguro, por favor póngase en contacto con su médico.`,
          yes: 'Si',
          no: 'NO o No estoy seguro',
        },
      },
      timeline: {
        title: 'Cronograma',
        noResults: 'NO HAY RESULTADOS ANTERIORES',
        overdue: 'ATRASADO',
        upcoming: 'PROXIMO',
        past: 'RESULTADOS ANTERIORES',
      },
      deleteAccount: {
        title: 'Enviar solicitud para eliminar',
        content1:
          'Cerrar una cuenta de On/Go es permanente. Si desea continuar, perderá acceso a sus records de pruebas y vacunación.\n\n',
        content2: 'Nota: ',
        content3: 'la cuenta será eliminada de manera oportuna. Mientras tanto, comuníquese con ',
        content4: 'support@letsongo.com ',
        content5: 'si tiene preguntas.\n\n',
        content6: '¿Esta seguro que quiere continuar con su solicitud?',
        cancel: 'Cancelar',
        submit: 'Enviar solicitud',
        submittedTitle: 'Solicitud enviada',
        submittedSubtitle:
          'Recibira un correo electrónico cuando su cuenta haya sido eliminada por completo.',
      },
    },
    profile: {
      basicInfo: {
        header: 'Información Básica',
        compModal: '¡Información básica guardada!',
      },
      health: {
        header: 'Perfil de Salud',
        birthday: 'Fecha de nacimiento',
        compModal: '¡Información de salud guardada!',
      },
      list: {
        header: 'Perfil',
        logout: 'Cerrar sesión',
        basic: 'Información Básica',
        health: 'Perfil de Salud',
        depend: 'Dependientes',
        org: 'Organizaciones',
        routine: 'Rutinas',
        accountSett: 'Configuración de su Cuenta',
        faq: 'Ayuda / Preguntas Frecuentes',
        policy: 'Política de privacidad',
      },
      routine: {
        date: 'Fecha de inscripción',
        org: 'Organización',
        description: {
          title: 'Descripción',
          description: `Protocolo de prueba de COVID-19 para empleados de Apple que viajan
          más de 3 veces al mes. Se requiere que empleados completen
          una prueba antígena de COVID-19 2 veces por semana.`,
        },
        sharing: {
          title: 'Configuración para compartir',
        },
        antigen: 'Prueba Antígena de COVID-19',
        pcr: 'Prueba PCR de COVID-19',
        overdue: 'Atrasado',
        upcoming: 'Próximo',
        past: 'Resultados anteriores',
      },
    },
    vaccine: {
      header: 'Tarjeta de Vacunación',
      add: {
        header: 'Agregar información de dosis',
        date: 'Fecha recibido',
        subtitle:
          'Una de las siguientes líneas es requerida. Incluya las dos si están disponibles.',
        healthcare: 'Profesional de Cuidado de Salud',
        clinic: 'Clinica',
        compModal: '¡Dosis de vacuna guardada!',
        remove: 'Eliminar',
        cancel: 'Cancelar',
      },
      edit: {
        header: 'Información de dosis',
        alert: {
          title: 'Volver a subir tarjeta',
          subtitle: '¿Esta seguro que quiere continuar? Perderá su tarjeta de vacunación actual.',
        },
        depend: {
          title: '¿De quien es esta tarjeta de vacunación? ',
          header: 'Escoja usuario',
        },
        preview: '¡Presione aquí para ver una versión en PDF!',
      },
      picker: {
        title: '¿Como le gustaría subir su tarjeta de vacunación? ',
        photo: 'Tomar foto',
        library: 'De su librería fotográfica',
        file: 'Subir archivo',
        org: {
          question: '¿No tiene la información de su vacuna en este momento? ',
          skip: ' Saltar por ahora',
        },
        comp: '¡Archivo subido!',
        modal: {
          title: `La aplicación solicita permiso para acezar sus fotos y documentos y poder subir su tarjeta de vacunación. `,
          subtitle: `Si desea subir una foto o documento de su vacuna atreves de su aparato, le pedimos acezo al almacenamiento exterior de su aparato. `,
        },
      },
      button: {
        remove: 'Eliminar',
        cancel: 'Cancelar',
        reupload: 'Volver a subir',
        continue: 'Continuar',
      },
    },
    passwordRequirment: `Su contraseña debe contener por lo menos 8 caracteres, por lo menos una letra mayúscula, por lo menos una letra minúscula por lo menos un número, y por lo menos un
    carácter especial.`,
    dependentsList: {
      title: '¿Para quien es esta prueba? ',
      header: 'Escoja usuario',
    },
    footer: {
      onBack: 'Atrás',
      onStartTimer: 'Empezar el cronómetro',
      onNext: 'Siguiente',
      onExit: 'Salida',
      Next: 'Siguiente',
      Home: 'Inicio',
      Complete: 'Completo',
    },
    exitAlert: {
      Text: '¿Está seguro que quiere salir? ',
      Title: 'Confirmar',
    },
    permissionsLocation: {
      EnableLocation: 'Permitir el acceso a la ubicación',
      PermissionsNeeded: 'Permiso necesario',
      SettingsIOS: 'Por favor abra la Configuración > Privacidad > Ubicación y permita IntrivoEye.',
      SettingsAndroid: 'Para usar las funciones de ubicación, active el permiso de Ubicación.',
      Settings: 'Configuración',
      CancelIOS: 'Cancelar',
      CancelAndroid: 'Rechazar',
    },
    yesNo: {
      Yes: 'Si',
      No: 'No',
    },
    firstScreen: {
      Title: 'CareStart™',
      Subtitle: 'Prueba casera de antígeno COVID-19',
      Start: 'Empezar',
      Version: 'Versión',
      Alert: 'Por favor asegúrese de estar conectado al internet.',
      Attention: 'Atención',
    },
    secondScreen: {
      Title: '¡Empezemos!',
      Text: 'Ahora lo guiaremos por los pasos necesarios para completar su prueba casera de COVID-19 CareStart adecuadamente y para poder conseguir sus resultados.',
    },
    selectAge: {
      Title: '¿Cual es la edad del paciente que se hará la prueba? ',
      SubTitle: 'Importante:',
      Text: 'Los procedimientos de la prueba pueden variar dependiendo de la edad del paciente',
      Younger: '13 años o menores de 13 años',
      YoungerRed:
        'Advertencia: Solo los padres o custodios legales pueden adquirir la muestra y proceder con la prueba para menores.',
      Older: '14 años o mayores de 14 años',
    },
    warning: {
      Title: 'Please find our terms and conditions below.',
      Text: `Immediately use after opening the test device in the pouch.
In order to obtain accurate results, the test must follow provided test procedures.
Excess blood or mucus on the swab specimen may interfere with test performance and may yield a false-positive result.
Do not interpret the test result before 10 minutes and after 15 minutes starting the test.
Inadequate or inappropriate sample collection, storage, and transport can result in incorrect results.If specimen storage is necessary, swabs can be placed into extraction buffer for up to four hours. Specimens should not be stored dry.
Do not use if the test device package is damaged.
Do not use the kit contents beyond the expiration date.
Do not eat, drink, or smoke in the area where the specimens and kit contents are handled.
Use appropriate precautions in the collection, handling, storage, and disposal of patient samples and used kit contents.
If the extraction buffer contacts the skin or eye, flush with copious amounts of water.
Do not interchange kit contents from different lots.
Do not re-use any contents in the kit as they are single-use only.
      `,
      CheckBoxText: 'He leido y entiendo',
      Scroll: '(Desplazar hacia abajo para seleccionar)',
      Text1:
        'This product has been authorized only for the detection of proteins from SARS-CoV-2, not for any other viruses or pathogens.',
      Text2:
        'As with all diagnostic tests, all results must be interpreted together with other clinical information available to the physician.',
      Text3: 'Immediately use after opening the test device in the pouch.',
      Text4: 'In order to obtain accurate results, the test must follow provided test procedures.',
      Text5:
        'Excess blood or mucus on the swab specimen may interfere with test performance and may yield a false-positive result.',
      Text6:
        'Do not interpret the test result before 10 minutes and after 15 minutes starting the test.',
      Text7:
        'Inadequate or inappropriate sample collection, storage, and transport can result in incorrect results.If specimen storage is necessary, swabs can be placed into extraction buffer for up to four hours. Specimens should not be stored dry.',
      Text8: 'Do not use if the test device package is damaged.',
      Text9: 'Do not use the kit contents beyond the expiration date.',
      Text10:
        'Do not eat, drink, or smoke in the area where the specimens and kit contents are handled.',
      Text11:
        'Use appropriate precautions in the collection, handling, storage, and disposal of patient samples and used kit contents.',
      Text12:
        'If the extraction buffer contacts the skin or eye, flush with copious amounts of water.',
      Text13: 'Do not interchange kit contents from different lots.',
      Text14: 'Do not re-use any contents in the kit as they are single-use only.',
    },
    searchAddressPlaceholder: 'Agrege su dirección aquí',
    introSteps: {
      1: {
        title: 'Empecemos con su',
        title2: 'correo electrónico',
        subtitle: 'Por favor de un correo electrónico valido',
      },
      2: {
        title: 'Establezca su contraseña',
        characters: '• 8+ caracteres',
        symbols: '• 1 simbolo',
        uppercase: '• 1 mayúscula',
        number: '• 1 número',
      },
      3: {
        title: 'Configuremos la autenticación de dos factores',
        skipTitle: 'Agreguemos un número telefónico',
        subtitle: 'Por favor de su teléfono móvil.',
      },
      4: {
        title: 'Verifique su cuenta',
        subtitle: 'Proporcione el código enviado a ',
        helpText: '¿Teniendo dificultades? ',
        helpButton: 'Reciba ayuda',
        supportMailSubjectLogin:
          'Ayuda con la autenticación de dos factores al iniciar sesión en la aplicación de On/Go',
        supportMailSubjectOnboarding:
          'Ayuda con la autenticación de dos factores al crear cuenta en la aplicación de On/Go',
        supportMailBody:
          'Estoy teniendo dificultad recibiendo el código de dos factores en mi aparato móvil. Aquí están los detalles para ayudar a solucionar el problema:  ',
        sendCodeToMail: 'Use mi correo electrónico en su lugar',
        sendCodeToPhone: 'Use mi numero telefónico en su lugar',
        newCode: 'Enviar un código nuevo',
        phone: 'teléfono móvil',
        sendCode: 'Enviar un código nuevo',
      },
      5: {
        title: 'END USER LICENSE AGREEMENT',
        subtitle: `Este Acuerdo del Licencia para el Usuario Final (“Acuerdo”) es un acuerdo vinculante entre usted (ya sea un individuo o una entidad legal) e Intrivo Diagnósticos, Inc. (“Intrivo” o “nosotros”).  Al bajar, instalar, acceder o utilizar el programa que acompaña (la “Aplicación”), quedara obligado bajo los términos de este Acuerdo y las condiciones encontradas en <a href="https://www.intrivo.com/terms-and-conditions">https://www.intrivo.com/terms-and-conditions</a> (los “Términos”) y nuestra Póliza de Privacidad, que se pueden encontrar en intrivo.com/privacy-policy/, las cuales han sido incorporadas a este Acuerdo. Los términos de este Acuerdo prevalecerán en la medida en que haya cualquier conflicto entre los términos de este Acuerdo y los Términos con respecto a su uso de esta Aplicación. Si es usted un individuo que está utilizando la Aplicación a nombre de una entidad, usted representa y garantía que tiene la autoridad legal para unir a esa entidad con este Acuerdo and que tal entidad está de acuerdo con ser responsable a nosotros sea el caso que usted viole este Acuerdo. Excepto por el enunciado anterior, cuando decimos “usted” en este Acuerdo, nos referimos a usted como individuo y dicha entidad legal. Si usted no está de acuerdo con los términos de este Acuerdo, incluyendo el ARBITRAJE OBLIGATORIO Y LA EXENCION DE DEMANDA COLECTIVA referenciado en las secciones 22 y 23 en la parte siguiente, entonces usted no debe bajar, instalar, acceder, usar o copiar la Aplicación.  
        
        Esta Aplicación está autorizada para su uso, no para su venta.  Con excepción a la licencia limitada que se otorga bajo este Acuerdo, nosotros y nuestras licenciadoras retenemos todo derecho, titulo e interés en la Aplicación y todos los derechos propietarios en la Aplicación, incluyendo derechos de autor, patentes, marcas registradas y derechos de industria.
        
        1. Cesión de Licencia. Le otorgamos una licencia revocable, no-transferible (con la excepción de lo indicado abajo), personal, no-exclusiva para utilizar la versión de código objeto de la Aplicación para uso exclusivo en su teléfono móvil personal.  No se permite instalar o usar la Aplicación en otro aparato que no se encuentre bajo su uso o control.  La Aplicación se puede acceder y utilizar bajo otras cuentas asociadas a través de cuentas compartidas con familia o adquisiciones por volumen.
        
        2. Limitaciones de la Licencia. La licencia que se otorga bajo este Acuerdo está restringida de la siguiente manera:
        
        Limitaciones a los Derechos de Autor y Distribución.  No se permite copiar o distribuir la Aplicación excepto de la manera que copiar la Aplicación sea necesario, como tal termino se describe en este Acuerdo.
        
        Limitaciones en Ingeniería Inversa y Modificación; APIs.  No se permite (i) acceder o usar la interfaz de la aplicación informática (“API”) para cualquier propósito otro que el uso autorizado de la Aplicación o (ii) ingeniería inversa, de copilar, desmontar, modificar o crear trabajos derivados de la Aplicación, con la excepción de lo que se permite expresamente bajo la ley que aplique. 
        
        Sublicencia, Renta y Uso de Terceros.  No se permite asignar, sublicenciar, rentar, utilizar colectivamente, prestar, arrendar o de otra manera transferir la Aplicación, o directa o indirectamente permitir que cualquier tercero copie o instale la Aplicación en un aparato bajo su propiedad o control. 
        
        Avisos Propietarios. No se permite remover, alterar, o oscurecer ningún aviso propietario (p. ej. avisos de derechos de autor o de marca registrada) de la Aplicación o sus documentos.
        
        Uso de Acuerdo a la Documentación.  Todo uso de la Aplicación debe ser de acuerdo con la documentación actual, si existe, que se haya proporcionado con la Aplicación o hecha disponible en nuestra página de web. No se puede aportar, subir, transmitir o de lo contrario proporcionar a o atreves de la Aplicación cualquier información, materiales o código ilegales o maliciosos. 
        
        Confidencialidad.  Debe mantener la Aplicación y cualquier documento relacionado bajo estricta confidencialidad para su propio uso. 
        
        Cumplimiento con la Ley que Aplica.  Usted tiene la única responsabilidad de asegurarse que su uso de la Aplicación este en cumplimento con todas las leyes extranjeras, federales, estatales y locales, al igual que con las reglas y regulaciones que apliquen. Usted no usara la Aplicación de cualquier manera que sea inconsistente con los términos del presente o que infrinjan los derechos propiedad intelectual de Intrivo o de cualquier otra compañía exterior. 
        
        Reglas de la Tienda de Aplicaciones.  Se requiere el uso de la Aplicación sea en cumplimiento estricto con todas las reglas y requisitos de uso de la Tienda de Aplicaciones de la que bajo la Aplicación.  Usted tiene la responsabilidad de localizar y revisar esas reglas y requisitos de uso.
        
        3. Configuración de Cuenta. Acuerda: (a) proporcionar información verídica, correcta, actual y completa en el momento de registrarse para utilizar la Aplicación y establecer su cuenta (“Información de Registro”) y (b) mantener y actualizar sin demora la Información de Registro para mantenerla verídica, correcta, actual, y completa.  Si proporciona cualquier información que sea falsa, incorrecta, no actual, o incompleta, y si tenemos un motivo razonable para sospechar que la información es falsa, incorrecta, no actual, o incompleta, podemos suspender o cancelar su cuenta.  Tiene la completa responsabilidad de mantener la confidencialidad de cualquier contraseña y de cualquier uso o actividades que ocurran en conexión con su cuenta.  Acuerda no permitir que otros acceder su cuenta o usen su contraseña.  Hacerlo compromete la seguridad de su cuenta.
        
        4. Mantenimiento y apoyo no incluido. Intrivo puede desplegar cambios, actualizaciones, o mejoras de la Aplicación en cualquier momento. Intrivo puede proporcionar mantenimiento y apoyo para la Aplicación, pero no tiene la obligación de cualquier manera de ofrecer estos servicios a usted y puede terminar estos servicios en cualquier momento sin aviso. Usted está de acuerdo que ni Apple (iOS Aplicación Móvil) ni Google (Android Aplicación Móvil) o cualquier otra entidad, tiene la obligación de proporcionar cualquier mantenimiento o servicios de apoyo en conexión a la Aplicación. 
        
        5. Servicios en Línea Asociados con la Aplicación. La Aplicación puede ser utilizad para acceder ciertos servicios en línea.  En algunos casos, no recibirá un aviso separado cuando la Aplicación se conecte a estos servicios.  El uso de la Aplicación constituye su consentimiento a la transmisión de información standard de aparatos (incluyendo, sin límite, información técnica sobre su aparato, sistema y programa de la aplicación) a esos servicios.  Su uso de esos servicios puede ser gobernado bajo términos y condiciones adicionales.  El uso de los servicios en línea constituye su aceptación y consentimiento a quedar obligado bajo los términos y condiciones adicionales, si existen.  No puede utilizar servicios en línea de ninguna manera que pueda dañar los servicios, interrumpir su operación, o impedir el uso de esos servicios de otros usuarios o de la red inalámbrica a través de la cual se acceder esos servicios.  No puede utilizar los servicios en línea para obtener acceso no autorizado o usar cualquier servicio, información, cuenta, o red por otros medios.
        
        6. IP y Comentarios. La Aplicación esta licenciada, no vendida. Intrivo y sus licenciantes retienen el derecho, el titulo y el interés en y a la Aplicación, u todos lo derechos de propiedad intelectual, incluyendo cualquier mejoramiento, copias, traducciones, adaptaciones, modificaciones, derivaciones y mejoras de la Aplicación. Excepto los derechos y licencias como mencionadas en este Acuerdo, Intrivo no da o transfiere a usted cualquier derecho, titulo o interés en o hacia la Aplicación a medio de implicación, exclusión o cualquier otra cosa, Intrivo, el logo de Intrivo y todos los nombres de servicios incluidos en la Aplicación son la marca registrada de Intrivo y otros afiliados. Puede ofrecer sugerencias, comentarios, o criticas (colectivamente, “Comentarios”) sobre nuestros productos y servicios, incluyendo la Aplicación. Los Comentarios son voluntarios.  Podemos utilizar Comentarios para cualquier propósito sin obligación alguna.  Al grado que se requiera una licencia bajo sus derechos de propiedad intelectuales para uso de los Comentarios, nos otorga una licencia irrevocable, global, no-exclusiva, perpetua, completamente prepagada, sin derechos de autor, para utilizar en conexión con nuestro negocio, incluyendo la mejora de la Aplicación y la provisión de servicios y productos para nuestros clientes.
        
        
        7. Terminación. Este Acuerdo y licencia terminaran automáticamente en caso de incumplimiento de los términos.  En caso de que se presente un reclamo por apropiación de propiedad intelectual por un tercero relacionado a la Aplicación, podemos terminar la Aplicación inmediatamente. 
        
        8. Compras dentro de la Aplicación. Puede elegir comprar herramientas o funcionalidad adicional para la Aplicación a través de compras dentro de la Aplicación.  Acuerda pagar todas las cuotas asociadas con compras realizadas dentro de la Aplicación.  Todas las cuotas son no-reembolsables y no-cancelables. Para poder pagar para estos productos o servicios, debe proporcionar cierta información relevante a su transacción, incluyendo, sin limitación, su número de tarjeta de crédito o débito, la fecha de vencimiento de su tarjeta de crédito o débito, el nombre en su tarjeta de crédito o débito, y/o el su dirección de cobro. USTED REPRESENTA Y GUARANTIZA QUE USTED TIENE EL DERECHO LEGAL PARA UTILIZAR CUALQUIER TARJETA DE CREDITO O DE DEBITO O CUALQUIER OTRA FORMA DE PAGO UTILIZADA EN CONNECCIÓN CON CUALQUIER TRANSACCIÓN.  
        
        9. Privacidad. Para más información sobre nuestras prácticas de privacidad y para revisar la Declaración de Privacidad visite <a href="https://intrivo.com/privacy-policy/">https://intrivo.com/privacy-policy/</a>.
        
        10. Funciones Activadas por Ubicación. Ciertas funciones de actividades por ubicación disponibles en la Aplicación son ofrecidas por Google, Inc., Apple, Inc. y/u otros proveedores terceros.  Su uso de esta funcionalidad puede quedar sujeto a términos y condiciones adicionales (de la manera que sean actualizados de tiempo en tiempo):  <a href="http://www.google.com/intl/en-US_US/help/terms_maps.html">http://www.google.com/intl/en-US_US/help/terms_maps.html</a> and <a href="https://www.apple.com/legal/internet-services/maps/terms-en.html">https://www.apple.com/legal/internet-services/maps/terms-en.html</a>.  Debe utilizar su propio criterio con respecto a la suficiencia y propiedad de la información.  Toda la información basada en ubicación se ofrece “como es”, sin garantías de ningún tipo.
        
        10. Soporte con la Aplicación; Funcionalidad. Todas las preguntas y peticiones con respecto a soporte con la Aplicación deben ser dirigidas a la dirección de contacto incluida abajo.  Los Terceros, como se definen en la Sección 15, no tienen responsabilidad de proporcionar soporte para la Aplicación y no deberán ser contactados para obtener soporte.  Podremos cambiar o remover funcionalidad y otras herramientas de la Aplicación en cualquier momento, sin aviso.
        
        12. Sus Garantías. Usted representa y garantiza que (i) no está ubicado en un país sujeto a un embargo del Gobierno de los Estados Unidos, o que se haya sido designado por el Gobierno de los Estados Unidos como un país que “apoya el terrorismo”; y (ii) no aparece listado en ninguna lista de partes prohibidas o restringidas del Gobierno de los Estados Unidos. Usted no utilizara esta Aplicación si cualquier ley en su país prohíbe que usted lo haga de acuerdo con estos términos. 
        
        13. Aviso de Exención de Garantías; Reembolso. LA APLICACIÓN SE PROPORCIONA “SEGÚN DISPONIBILIDAD”, “TAL CUAL”.  A LA MEDIDA MAXIMA PERMITIDA POR LA LEY, NOSOTROS Y NUESTORS PROVEEDORES Y LICENCIANTES RENUNCIAMOS A TODAS LAS GARANTIAS CON RESPECTO A LA APLICACIÓN, INCLUEYNDO, ENTRE OTRAS, LAS GARANTIAS IMPLICITAS DE NO INFRACCION, TITULO, COMERSIBILIDAD, DISFRUTE PACIFICO, CALIDAD DE LA INFORMACION Y CAPACIDAD PARA UN PROPOSITO PARTICUALR.  NOSOTROS Y NUESTORS PROVEEDORES Y LICENCIANTES NO GARANTIZAMOS QUE LA APLICACIÓN CUMPLIRA CON SUS REQUISITOS, O QUE EL FUNCIONAMIENTO DE LA APLICACIÓN SERA ININTERRUIMPIDO O LIBRE DE ERRORES, O QUE LOS DEFECTOS EN LA APLICACIÓN SERAN CORREGIDOS.  En caso que la Aplicación no funcione materialmente de acuerdo con su documentación vigente en ese momento, puede notificar al proveedor de la tienda de aplicaciones, y sujeto a las políticas y términos vigentes del proveedor de la tienda de aplicaciones, le reembolsaran el precio de compra, si existe, que usted haya pagado por la Aplicación; y que, a la medida máxima permitida por la ley aplicable, el proveedor de la tienda de aplicaciones no tendrá ninguna otra obligación con respecto a la Aplicación, y cualquier otro reclamo, perdida, responsabilidad, daño, costo o gasto atribuible a cualquier falla de la Aplicación en operar materialmente de acuerdo con su documentación vigente en ese momento se regirá de acuerdo a los términos de este Acuerdo.
        
        14. Aparatos y Sistemas Operativos Modificados. No tenemos ninguna responsabilidad por errores, funcionamiento no confiable, u otros problemas que resulten por el uso de la Aplicación o en conexión con aparatos fijos o el uso en cualquier aparato móvil que no cumpla con las especificaciones originales del fabricante, incluido el uso de versiones modificadas del sistema operativo (colectivamente, “Aparatos Modificados”).  El uso de la Aplicación en Aparatos Modificados será bajo su único y exclusivo riesgo y responsabilidad.
        
        15. Sin Responsabilidad por Terceros, Tiendas de Aplicaciones, Proveedores de Servicios Inalámbricos. Su proveedor de servicios inalámbricos, el fabricante y vendedor de su aparato móvil, el desarrollador del sistema operativo de su aparato móvil, el operador de cualquier tienda de aplicaciones, mercado, o servicio similar a través del cual obtenga la Aplicación, Apple Inc., Google LLC, y sus respectivos afiliados, proveedores y otorgantes de licencias (colectivamente, los "Terceros") no son partes de este Acuerdo y no poseen ni son responsables de la Aplicación, incluyendo, sin limitación, reclamos por: (i) responsabilidad de fabricante; (ii) cualquier reclamo que la Aplicación no cumple con cualquier requisito legal o reglamentario aplicable; y (iii) reclamos que surjan bajo la protección del consumidor, privacidad o legislación similar. Usted es responsable de cumplir con todos los términos y condiciones de la tienda de aplicaciones y de otros terceros aplicables. USTED ACEPTA (I) QUE LOS TERCEROS RENUNCIAN A TODAS LAS GARANTÍAS, EXPLÍCITAS E IMPLÍCITAS, CON RESPECTO A LA APLICACIÓN, INCLUIDAS, ENTRE OTRAS, LAS GARANTÍAS IMPLÍCITAS DE NO VIOLACIÓN, TÍTULO, COMERCIABILIDAD, DISFRUTE PACIFICO, CALIDAD DE LA INFORMACIÓN Y CAPACIDAD PARA UN PROPÓSITO PARTICULAR; (II) EN NINGÚN CASO LOS TERCEROS SERÁN RESPONSABLES ANTE USTED O CUALQUIER TERCERO POR CUALQUIER DAÑO DIRECTO, INDIRECTO, PUNITIVO, EJEMPLAR, INCIDENTAL, ESPECIAL O CONSECUENTE (YA SEA BAJO CONTRATO, AGRAVIO (INCLUYENDO NEGLIGENCIA), U OTRO) QUE SURJA DE ESTE ACUERDO O DE LA APLICACIÓN, INCLUSO SI HAN SIDO ADVERTIDOS DE LA POSIBILIDAD DE DICHOS DAÑOS O PÉRDIDAS; (III) EN CUALQUIER CASO, LA RESPONSABILIDAD MÁXIMA DE CUALQUIER TERCERO POR TODAS LAS RECLAMACIONES (YA SEA BAJO CONTRATO, AGRAVIO (INCLUYENDO NEGLIGENCIA) O DE OTRO TIPO) DE TODO TIPO NO EXCEDERÁ CINCO DÓLARES ($5,00); Y (IV) USTED RENUNCIA A CUALQUIER RECLAMO, AHORA CONOCIDO O POSTERIORMENTE DESCUBIERTO, QUE PUEDA TENER CONTRA TERCEROS DERIVADO DE LA APLICACIÓN Y ESTE ACUERDO. LOS TERCEROS SON BENEFICIARIOS DESTINADOS DE ESTE ACUERDO, CAPACES DE HACER CUMPLIR DIRECTAMENTE SUS TÉRMINOS. NADA DE LO CONTENIDO EN ESTE ACUERDO SE INTERPRETARÁ COMO MODIFICACIÓN O ENMIENDA DE CUALQUIER ACUERDO U OTROS TÉRMINOS ENTRE USTED Y TERCEROS CON RESPECTO A LOS ASUNTOS ALLI CONTENIDOS. En el caso de cualquier reclamo de que la Aplicación, o que su posesión y uso de la Aplicación infringe los derechos de propiedad intelectual de un tercero, los Terceros no son responsables de la investigación, defensa, resolución o descarga del reclamo de violación de derechos.
        
        16. Limitación de Responsabilidad. EN LA MEDIDA MÁXIMA PERMITIDA POR LA LEY, EN NINGÚN CASO NOSOTROS O NUESTROS PROVEEDORES Y LICENCIANTES NOS HAREMOS RESPONSABLES ANTE USTED O CUALQUIER TERCERO POR CUALQUIER DAÑO DIRECTO, ESPECIAL, INCIDENTAL, CONSECUENTE, PUNITIVO O INDIRECTO (YA SEA BAJO CONTRATO, AGRAVIO (INCLUYENDO NEGLIGENCIA ), O DE OTRO MODO), QUE INCLUYEN, SIN LIMITACIÓN, DAÑOS POR LESIONES PERSONALES, PÉRDIDA DE INGRESOS, PÉRDIDA DE DATOS E INTERRUPCIÓN DE NEGOCIOS, DERIVADOS DEL USO O LA IMPOSIBILIDAD DE USO DE LA APLICACIÓN, AUN SI HAN SIDO ADVERTIDOS SOBRE LA POSIBILIDAD DE DICHOS DAÑOS . EN CUALQUIER CASO, TODA NUESTRA RESPONSABILIDAD Y LA DE NUESTROS PROVEEDORES Y LICENCIANTES BAJO ESTE ACUERDO POR TODOS LOS DAÑOS, PÉRDIDAS Y ACCIONES CAUSALES (YA SEA BAJO CONTRATO, AGRAVIO (INCLUIDA LA NEGLIGENCIA) O DE OTRO MODO), CON RESPECTO  AL USO DE LA APLICACIÓN ES LIMITADO A CINCUENTA DOLARES ($50.00).
        NUESTROS PROVEEDORES Y LICENCIANTES SON BENEFICIARIOS TERCEROS DE ESTE ACUERDO, CAPACES DE HACER CUMPLIR DIRECTAMENTE ESTE ACUERDO CONTRA USTED COMO BENEFICIARIO TERCEROS. USTED RENUNCIA A CUALQUIER RECLAMO, AHORA CONOCIDO O DESCUBRIDO POSTERIORMENTE, QUE PUEDA TENER CONTRA NUESTROS PROVEEDORES Y LICENCIANTES QUE SURJAN DE LA LICENCIA DE LA APLICACIÓN Y SU COMERCIALIZACIÓN, SU USO DE LA APLICACIÓN Y ESTE ACUERDO. SUS ÚNICOS Y EXCLUSIVOS RECURSOS SERAN CONTRA NOSOTROS Y ESTAN SUJETOS A LAS PROVISIONES DE ESTE ACUERDO.
        Algunos estados no permiten la exclusión de daños incidentales o consecuentes, o la limitación de la duración de una garantía implícita, por lo que es posible que parte de lo anterior no le aplique a usted.
        
        17. Redes Sociales y Otros Servicios de Terceros. La Aplicación se puede utilizar para acceder y utilizar determinados servicios de terceros (p. ej., Twitter, Facebook, Dropbox, etc.), y podrá mostrar, incluir, o hacer disponible contenido tercero (incluyendo datos, información, aplicaciones, y otros productos, servicios, y/o materiales) o proporcionar acceso a páginas de internet de terceros, incluyendo a través de anuncios Terceros (“Materiales Terceros”). Esta consciente y de acuerdo que la Compañía no es responsable por materiales de Terceros, incluyendo su precisión, su integridad, su puntualidad, su validez su cumplimiento de derechos de autor, legalidad, decencia, calidad o cualquier otro aspecto del mismo. La Compañía no asume y no tendrá responsabilidad a usted o a cualquier otra persona o entidad para cualquier Material Tercero. Materiales de Terceros son proporcionados únicamente como una conveniencia a usted, y su acceso y uso de ellos es enteramente bajo su propio riesgo y sujeto a los términos y condiciones de las compañías terceras. En adición a los términos de este Acuerdo, su uso de esos servicios estará sujeto a los términos y condiciones del servicio de terceros aplicable, incluidas sus políticas de privacidad. Usted tiene la responsabilidad de revisar y aceptar esos términos antes de transferir o publicar cualquier información en sus servicios. Usted comprende y acepta que esos servicios no son proporcionados por nuestros agentes y que no tenemos ninguna responsabilidad por ellos. Todos los servicios de terceros se proporcionan tal cual, y según estén disponibles, sin garantías de ningún tipo.
        
        18. Su Indemnización. Usted nos indemnizará, defenderá y eximirá de responsabilidad a nosotros y a nuestros proveedores y licenciantes y a los Terceros de todos los daños, responsabilidades, costos, multas, sanciones y gastos que surjan de su incumplimiento de este Acuerdo o de los Términos.
        
        19. Restricciones a la Exportación e Importación. Usted cumplirá con Estados Unidos o cualquier otra ley de control de exportación, exportación de artículos, programas o tecnología, incluyendo asegurarse de que: (a) ningún equipo, información técnica, o Aplicación sea exportada o re-exportada a cualquier país, persona o entidad en violación de cualquier control de exportación o sanciones de Estados Unidos u otra; y/o (b) que cualquier cosa recibida por Intrivo no sea usada o re-exportada para un uso prohibido bajo cualquier ley de control de exportación de Estados Unidos u otro. 
        
        20. Restricciones Gubernamentales. Cualquier programa de informática u otra programación proporcionado por nosotros con relación a este Acuerdo es un programa informático comercial según se describe en DFARS 252.227-7014(a)(1) y FAR 2.101. En caso de ser adquirido por o en nombre del Departamento de Defensa de los Estados Unidos o cualquier componente de este, el Gobierno de los Estados Unidos adquiere este programa de informática comercial y la documentación del programa de informática comercial sujeto a los términos de este Acuerdo como se especifica en DFARS 227.7202-3, Derechos en Programas de Informática Comercial y Documentación de Programa de Informática Comercial.  En caso de ser adquirido por o en nombre de cualquier agencia civil, el Gobierno de los Estados Unidos adquiere este programa de informática comercial y la documentación del programa de informática comercial sujeto a los términos de este Acuerdo como se especifica en FAR 12.212, Programas de Informática.
        
        21. Generalidades. Este Acuerdo será analizado, interpretado y ejecutado exclusivamente de acuerdo con las leyes del Estado de California, Estados Unidos de América, sin dar efecto a ningún principio de leyes de conflicto. Cualquier acción legal o de equidad que surja de este Acuerdo o se relacione directa o indirectamente con este Acuerdo solo se puede iniciar en los tribunales federales o estatales ubicados en Los Ángeles, California. Usted y nosotros damos nuestro consentimiento para someternos a la jurisdicción personal de esos tribunales para propósitos de cualquier acción legal relacionada con este Acuerdo, al igual que al servicio extraterritorial de notificación de la demanda. Usted acepta que, independientemente de cualquier estatuto o ley que establezca lo contrario, cualquier reclamo o causa de acción legal que pueda tener en base de o relacionada a este Acuerdo debe presentarse dentro de un (1) año después de que surgió el reclamo o la acción legal. Este Acuerdo constituye el entendimiento y acuerdo completo entre nosotros y usted con respecto a las transacciones contempladas en este Acuerdo y reemplaza todas las previas comunicaciones contemporáneas orales o escritas con respecto al sujeto de este Acuerdo, todas las cuales se fusionan en este Acuerdo. Este Acuerdo no puede ser modificado, enmendado o alterado de ninguna manera, excepto mediante un instrumento por escrito firmado por representantes autorizados de ambas partes. En caso de que se determine que cualquier provisión de este Acuerdo es inválida o inejecutable por decreto judicial, el resto de este Acuerdo seguirá siendo válido y ejecutable de acuerdo con sus términos.  Cualquier falla por nuestra parte en hacer cumplir estrictamente cualquier provisión de este Acuerdo no operará como renuncia a esa provisión o cualquier incumplimiento posterior de esa provisión. Las renuncias y limitaciones de responsabilidad y su indemnización sobrevivirán cualquier rescisión o vencimiento de este Acuerdo. Este Acuerdo se puede aceptar en forma electrónica (p. ej., por un medio electrónico u otro para demostrar su consentimiento) y su aceptación se considerará vinculante entre usted y nosotros. Ni usted ni nosotros disputaremos la validez o fuerza ejecutiva de este Acuerdo, incluso bajo cualquier estatuto aplicable de la exigencia normativa de la forma escrita como requisito para contratos, por haber sido aceptado o firmado en forma electrónica. Los registros mantenidos electrónicamente, cuando se produzcan en forma impresa, constituirán registros de negocios y tendrán la misma validez que cualquier otro registro de negocio generalmente reconocido. <b> SE ENTIENDE Y ACEPTA EXPRESAMENTE QUE EN CASO DE QUE SE DETERMINE QUE CUALQUIER RECURSO EN VIRTUD DEL PRESENTE HA FALLADO EN CUMPLIR SU PROPÓSITO ESENCIAL, TODAS LAS LIMITACIONES DE RESPONSABILIDAD Y EXCLUSIONES DE DAÑOS PERMANECERÁN EN VIGOR.
        
        22. Arbitraje. En el caso de que las partes no puedan resolver cualquier disputa entre ellas que surja de este Acuerdo o en relación con cualquiera de sus disposiciones, ya sea por contrato, agravio o de otra manera por ley o en equidad por daños o cualquier otra compensación, entonces tal la disputa se resolverá únicamente mediante arbitraje final y vinculante de conformidad con la Ley Federal de Arbitraje, realizado por un solo árbitro neutral y administrado por la Asociación Estadounidense de Arbitraje, o un servicio de arbitraje similar seleccionado por las partes, en un lugar acordado mutuamente por las partes. El premio del árbitro será definitivo y se podrá dictar sentencia en cualquier tribunal que tenga jurisdicción. En el caso de que cualquier acción, procedimiento o arbitraje legal o equitativo surja de este Acuerdo o se relacione con este, la parte vencedora tendrá derecho a recuperar sus costos y honorarios razonables de abogados. Las partes acuerdan arbitrar todas las disputas y reclamos con respecto a este Acuerdo o cualquier disputa que surja como resultado de este Acuerdo, ya sea directa o indirectamente, incluidas las reclamaciones de responsabilidad extracontractual que sean el resultado de este Acuerdo. Las partes acuerdan que la Ley Federal de Arbitraje rige la interpretación y ejecución de esta disposición. El Árbitro determinará toda la disputa, incluido el alcance y la aplicabilidad de esta disposición de arbitraje. Esta disposición de arbitraje sobrevivirá la terminación de este Acuerdo.
        
        23. Renuncia a demanda colectiva. Cualquier arbitraje en virtud de este Acuerdo se llevará a cabo de forma individual; No se permiten los arbitrajes de clase ni las acciones de clase/representantes/colectivas. LAS PARTES ACEPTAN QUE UNA PARTE PUEDE PRESENTAR RECLAMOS CONTRA LA OTRA ÚNICAMENTE EN CAPACIDAD INDIVIDUAL DE CADA UNO, Y NO COMO DEMANDANTE O MIEMBRO DE MI CLASE PUTATIVA, PROCEDIMIENTO COLECTIVO Y/O REPRESENTANTE, COMO EN LA FORMA DE UNA ACCIÓN GENERAL DE ABOGADO PRIVADO CONTRA EL OTRO. También, a menos que tanto usted como Intrivo acuerden lo contrario, el árbitro no puede consolidar las reclamaciones de más de una persona y no puede presidir ninguna forma de procedimiento representativo o colectivo.
        `,
      },
      // 6: {
      //   title: "Cláusulas",
      //   subtitle:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget congue tellus. Donec nec elementum orci, commodo tempor augue. Suspendisse et risus quis velit tempor efficitur. Donec id magna ac risus cursus luctus eget nec eros. Morbi suscipit a orci ut semper. In hac habitasse platea dictumst. Nullam in urna id neque tempus viverra in in libero. Aenean mollis dolor at lectus fermentum, non varius ante dignissim. Aenean fringilla ac diam id egestas. Vivamus magna risus, tristique at dignissim non, euismod ac ex. Duis varius gravida lacus, et pellentesque nisi dapibus quis. Donec in elit in ex ornare pretium.",
      // },
      6: {
        title: 'Introduzca código postal',
        title2: 'donde vive actualmente',
        subtitle: 'Por favor introduzca un código postal que sea valido',
      },
      7: {
        optional: 'Opcional',
        title: 'Díganos un poco sobre usted',
        subtitle: 'Por favor introduzca su información básica',
        infoDisclosureCTA: 'Aprenda como usamos esta información',
        infoDisclosureDescription1:
          'En Intrivo, cuidamos de su información como si fuera nuestra. No la vendemos, simplemente nos ayuda a proporcionarle una mejor experiencia.\n\n',
        infoDisclosureDescription2:
          'Aquí hay mas detalles explicando como utilizaremos su información...\n\n',
        infoDisclosureDescription3: `Requerimos correo electrónico para crear su cuenta, y su número telefónico para proteger su información y su cuenta lo mejor posible (después de todo, la aplicación estará guardando sus registros de pruebas y vacunación).

También pedimos su primer nombre y apellido para asegurar que sus registros están marcados como suyos, y su cumpleaños para ayudarnos a personalizar su experiencia cuando complete una prueba. Por ejemplo, el proceso de completar una prueba con menores de edad es un poco distinto.`,
      },
      8: {
        1: {
          title: '¿Planea hacer la prueba a un dependiente? ',
        },
        2: {
          title: 'Díganos sobre su primer dependiente',
          subtitle: 'Por favor introduzca su información',
        },
      },
    },
    zip: {
      Title: 'Por favor indique el código postal de su ubicación actual.',
      Placeholder: 'Introduzca código postal',
      Error: 'ERROR: Código postal invalido',
    },
    selectSymptoms: {
      Title: 'Por favor seleccione TODOS los síntomas que ha tenido.',
      Subtitle: 'Por favor seleccione todo lo que aplica.',
      Options: {
        1: 'Fiebre arriba de 100.4F/38C o escalofríos',
        2: 'Tos',
        3: 'Falta de aire o dificultad para respirar',
        4: 'Fatiga',
        5: 'Dolores musculares o corporales',
        6: 'Dolor de cabeza',
        7: 'Nueva pérdida del gusto o del olfato',
        8: 'Dolor de garganta',
        9: 'Congestión o secreción nasal',
        10: 'Diarrea',
        11: 'Ninguno de los anteriores',
      },
    },
    anySymptoms: {
      Title: '¿Ha tenido alguno de los siguientes síntomas?',
      Options: {
        1: 'Fiebre arriba de 100.4F/38C o escalofríos',
        2: 'Tos',
        3: 'Falta de aire o dificultad para respirar',
        4: 'Fatiga',
        5: 'Dolores musculares o corporales',
        6: 'Dolor de cabeza',
        7: 'Nueva pérdida del gusto o del olfato',
        8: 'Dolor de garganta',
        9: 'Congestión o secreción nasal',
        10: 'Diarrea',
        11: 'Ninguno de los anteriores',
      },
    },
    dateSymptoms: {
      Title: '¿Cuando comenzaron sus síntomas?',
      DatePicker: 'Selector de Fecha',
      No: 'No lo se',
    },
    note: {
      Title: 'Nota:',
      Text: 'El desempeño clinico de la prueba casera de antígeno COVID-19 CareStart™ fue validad para individuos que sospechen tener COVID-19 dentro de los 5 días de que empezaron los síntomas.',
    },
    biotin: {
      Title: 'Limitaciones para usuarios tomando el suplemento de Biotina (Vitamina B7):',
      Text: 'Resultados falso-negativo pueden suceder en pacientes que han indicado o que su estatus o historial clínico indiquen que en este momento están tomando dosis altas de Biotina (> 10 mg por día).',
    },
    video: {
      Title: 'Video de procedimiento de prueba',
      Text: 'Este video proporcionará un resumen completo de los procedimientos para realizar pruebas de Covid-19. A continuación se proveerán las instrucciones paso a paso.',
      Play: 'Presione para Iniciar​',
      Important: 'IMPORTANTE: No abra la caja ni realice la prueba durante este video.',
    },
    steps: {
      1: {
        Title: 'Paso 1:',
        Text: 'Lávese bien las manos.',
      },
      2: {
        Title: 'Paso 2:',
        Text: 'Saque los componentes de su prueba casera de COVID-19 CareStart™ de la caja.',
      },
      3: {
        Title: 'Paso 3:',
        Text: 'Saque el casete de la prueba y colóquelo sobre una superficie limpia y plana.',
      },
      4: {
        Title: 'Paso 4:',
        Text: ' Encuentre el vial de extracción y quite cuidadosamente el sello de papel aluminio, asegurándose de mantener el vial en posición vertical, y colóquelo en la bandeja de empaquetado.',
      },
      5: {
        Title: 'Paso 5:',
        Text: 'Encuentre el hisopo nasal y sáquelo de su bolsa. Tenga cuidado de no tocar la punta del hisopo.',
      },
      6: {
        Title: 'Paso 6:',
        Text1: 'Inserte suavemente el hisopo aproximadamente ¾ pulgadas en la fosa nasal',
        BoldText: ' IZQUIERDA ',
        Text2:
          'Luego, gire el hisopo lentamente al menos 5 veces de manera circular durante un total de 15 segundos.',
        Text3: 'Si tiene preguntas, vea el ',
      },
      7: {
        Title: 'Paso 7:',
        Text1: 'Retire suavemente el hisopo de la fosa nasal',
        BoldText1: ' IZQUIERDA ',
        Text2: 'y colóquelo directamente en la fosa nasal',
        BoldText2: ' DERECHA ',
        Text3:
          'y repita el proceso de rotar al menos 5 veces de manera circular durante un total de 15 segundos. Retire el hisopo de la fosa nasal',
        BoldText3: ' DERECHA. ',
      },
      8: {
        Title: 'Paso 8:',
        Text: 'Coloque el hisopo en el vial de extracción. Gírelo energéticamente al menos 5 veces.',
      },
      9: {
        Title: 'Paso 9:',
        Text: 'Retire el hisopo al girarlo contra el vial de extracción mientras aprieta los lados del vial para poder exprimir el liquido del hisopo.',
        Text2: 'Descarte el hisopo en la basura.',
      },
      10: {
        Title: 'Paso 10:',
        Text: 'Cierre el vial al colocar la tapa firmemente en el vial.',
      },
      11: {
        Title: 'Paso 11:',
        Text: 'Con el dedo, mezcle bien al golpear la parte inferior del vial.',
      },
      12: {
        Title: 'Paso 12:',
        Text: 'Invierta el vial de extracción y sostenga la muestra verticalmente por encima del pocillo de la muestra. Apriete el vial suavemente. Deje caer',
        BoldText: 'TRES (3)',
        Text2: 'gotas de la muestra en el pocillo de la muestra.',
        TextRed: 'Presione el botón de abajo el momento que la muestra se haya agregado.',
        Button: 'Presione después de aplicar muestra',
      },
    },
    timer: {
      Title1: 'La prueba esta haciendo su trabajo',
      Text1: 'La prueba estará lista cuando el termine el cronómetro.',
      Remaining: 'Restante',
      Button1: 'Por favor espere…',
      Title2: 'Interpretación de resultado',
      Text2:
        'Su prueba esta lista para ser interpretada. Por favor, coloque su casete de la prueba sobre una <b>superficie plana</b> y asegúrese que haya buena luz para poder tomar la foto.',
      Button2: 'Tome foto',
      Start: 'Empezar el cronómetro',
      Complete: '¡Terminado!',
      Important:
        'Importante: No mueva o levante el casete de prueba durante este tiempo. No salga de la aplicación durante este proceso.',
    },
    scanner: {
      IPosition: 'Posicione el casete dentro del área marcada.',
      IFocus: ' Asegúrese de que este enfocada y correctamente orientada.',
      ICapture: 'Cuando este listo, presione el botón de la cámara para capturar la imagen.',
      IReady: '¡Adelante!',
      IRetry1: '¡Imagen no aceptada!\rIntentar de nuevo.',
      IRetry2: '¡Imagen no aceptada!\rIntentar una vez más.',
      Text: '',
      AlertTitle: 'Info',
      AlertText:
        'Con buena luz, alinear el casete con el contorno proporcionado. Asegúrese de que el código de barra este dentro la parte de arriba, y que el área de la prueba este dentro la parte de abajo de la ventana. Permita que la cámara enfoque antes de presionar el botón.',
    },
    questions: {
      redLine: {
        Text: 'Confirme resultado',
        Title1: '¿Hay una línea',
        Red: ' ROJA ',
        Or: 'o',
        Pink: ' ROSA ',
        Title2: 'junto a la ‘C’ en la prueba?',
        Options: {
          1: 'SI – hay una línea ROJA/ROSA ',
          2: 'NO – no veo una línea.',
        },
        alert: {
          Title: '',
          Text1: '¿Esta seguro que NO hay una línea roja junto a la ‘C’ en la prueba?',
          Text2: '¿Esta seguro de que hay una línea roja junto a la ‘C’ en la prueba?',
        },
      },
      blueLine: {
        Text: 'Confirme resultado',
        Title1: '¿Hay una línea',
        Blue: ' AZUL ',
        Title2: 'junto a la ‘T’ en la prueba?',
        Options: {
          1: 'SI – hay una línea AZUL',
          2: 'NO – no veo línea.',
        },
      },
      certenBlue: {
        Subtext: '¿Esta seguro?',
        Title1: '¿Esta seguro de que hay una línea',
        Blue: ' AZUL ',
        Title2: 'junto a la ‘T’ en la prueba?',
        Text: '¿Similar a lo que aparece en cualquiera de las imágenes en esta pantalla, aunque sea muy clara?​',
        Options: {
          1: 'SI – hay una línea AZUL',
          2: 'NO – no veo línea.',
        },
      },
    },
    testResult: {
      Title1: 'Prueba Completada',
      Title2: 'Resultados de su prueba',
      Text3:
        'Usted ha completado la prueba. Por favor descarte casetes usados y otros componentes en la basura.',
      Text4: 'Descarte casetes usados y otros componentes en la basura.',
      Detected: {
        Status: 'Positivo',
        Title: 'COVID-19 Detectado',
        Subtitle: 'Su prueba ha sido interpretada correctamente. Su resultado es',
        Text: 'Guías del CDC: ',
        1: 'Quédese en casa.',
        2: 'Aíslese de otros ',
        3: 'Póngase en contacto con su proveedor de cuidado de salud para determinar el mejor tratamiento para usted',
      },
      NotDetected: {
        Status: 'Negativo',
        Title: 'COVID-19 No Detectado',
        Subtitle: 'Su prueba ha sido interpretada correctamente. Su resultado es',
        Text: 'Guías del CDC: Use una mascarilla que cubra su nariz y boca. Mantenga 6 pies de distancia de otros. Evite multitudes. Lávese las manos a menudo. Evite espacios con poca ventilación.',
      },
      Invalid: {
        Status: 'Invalido',
        Title: 'Prueba Invalida',
        Text: 'Es posible que necesite completar otra prueba de COVID-19.',
        Text2: 'Guías del CDC: ',
        1: 'Use una mascarilla que cubra su nariz y boca',
        2: 'Mantenga 6 pies de distancia de otros',
        3: 'Evite las multitudes',
        4: 'Lávese las manos a menudo',
        5: 'Evite espacios con poca ventilación',
        Text3: 'Lea mas en ',
        Sorry:
          ' Sorry: Lo sentimos – el tiempo necesario para tomar la foto de su casete ha caducado. Por favor reiniciar el proceso.',
      },
    },
    seeResult: {
      Title: 'Ver resultado',
    },
    anthem: {
      Title: 'Consentimiento para compartir datos',
      Description:
        'Al escanear el código QR en su kit de dos pruebas de CareStart, usted reconoce que las pruebas son otorgadas solamente para el use del miembro llamado Anthem y que los resultados de la prueba que usted reporta en la aplicación móvil serán compartidos con Anthem. Como mencionado en el papel incluido en el kit de la prueba, después del uso de la primera prueba, por favor guarde la caja para poder escanear de nuevo el código QR cuando necesite utilizar la segunda prueba. El aviso de política de privacidad contenido en esta aplicación describe como su información de salud protegida puede ser utilizada o revelada con el propósito que es permitido o requerido por ley.',
      Button: 'Siguiente',
    },
    forgetPassword: {
      title: 'Ingrese el correo electrónico\nusted utilizo para iniciar sesión',
      textDescription: 'Le enviaremos un código de verificación a su correo electrónico.',
      placeholder: 'Correo Electrónico',
      button: 'Continuar',
    },
    resetPassword: {
      enterCode: 'Ingrese el código de 6 dígitos que le mandamos a su teléfono móvil.',
      enterEmailCode: 'Ingrese el código de 6 dígitos que le mandamos a su correo electrónico.',
      enterEmailCodeSubtitle: `Ingrese el código enviado a {{email}}`,
      enterCodeSubtitle: `Ingrese el código enviado a {{phone}}`,
      needHelp: '¿Teniendo dificultades?',
      emailUs: 'Reciba ayuda',
      resend: 'Vuelva a enviar código',
      supportMailSubject: 'Ayuda con el código de contraseña olvidado de la aplicación On/Go',
      code: 'Código de verificación',
      supportMailBody:
        'Estoy teniendo problemas recibiendo el código de dos factores enviado a mi teléfono móvil, al intentar reiniciar mi contraseña. Aquí están mis datos específicos para poder ayudar a solucionar el problema: ',
    },
    cameraPermission: {
      header: 'Acceso de cámara',
      title: 'Permita acceso a su cámara para continuar.',
      testProcess:
        'Proceso de prueba – Esta aplicación utiliza la cámara para poder tomar foto del casete de prueba. Esta foto es transmitida a nuestros servidores y analizados para asegurar que la prueba es valida.',
      vaccineCard:
        'Tarjeta de vacunación – Esta aplicación utiliza la cámara para poder tomar foto del casete de prueba. La imagen es guardada en su aparato y puede ser guardada en nuestros servidores para apoyar la función de compartir.',
      liveChat:
        'Chat en vivo – Esta aplicación utiliza la cámara para poder proveer apoyo en vivo, cara a cara con un Care Guide.',
      button: 'Continuar',
    },
    alertMessage: {
      // temporary text may need to be changed
      removeVaccinationCard: '¿Esta de acuerdo con eliminar la tarjeta de vacunación?',
    },
    updateConsent: {
      title: 'Hemos actualizado nuestros términos. Por favor acepte para proceder.',
    },
    organizationConsent: {
      title: 'Información de Vacunación\nDescargo de Responsabilidad y Consentimiento',
      consent: `Al presionar abajo y al subir mi evidencia de vacunación contra COVID-19, o confirmación de que no estoy vacunado contra el COVID-19 (“Datos” colectivos), en mi aplicación de On/Go, reconozco y acepto que estoy voluntariamente proporcionando mi evidencia de vacunación contra COVID-19 o confirmación de que no estoy vacunado contra COVID-19 (estatus de “Vacunación”) y otra información incluyendo nombre, correo electrónico, dirección y número telefónico a United Rentas (“UR”) y Intrivo Diagnostics, Inc. (“Intrivo”) y doy mi consentimiento expreso a la colección, almacenamiento, uso y transferencia de mi estatus de Vacunación a UR y Intrivo como definido en lo siguiente.

Si no estoy vacunado contra COVID-19, yo, por la presente, autorizo a UR y a Intrivo a coleccionar, almacenar, utilizar y transferir mi estatus de Vacunación, y los resultados de mis pruebas de COVID-19, si es aplicable (“Información de Salud” colectivos) a cada uno y a estados/condados/provincias/autoridades (si es aplicable) como requerido por la ley.

Yo reconozco y estoy de acuerdo al decir que el propósito de UR de coleccionar, almacenar, usar y transferir mi Información de Salud es para permitir que UR:

a.) pueda prevenir o reducir la amenaza seria e inminente que COVID-19 presenta a la salud y seguridad de los empleados, contratistas, visitantes y la comunidad en general de UR;

b.) ayude a facilitar información relacionada con COVID u otro beneficio (por ejemplo, dado de baja por enfermedad, beneficios médicos, beneficios por discapacidad, etc.), en la medida permitida por la ley; y

c.) confirme que individuos están vacunados para cumplir con las obligaciones legales de UR (“Propósitos de UR” colectivos).

Yo reconozco y estoy de acuerdo que el propósito de Intrivo en la colección, almacenamiento y transferencia de mi Información de Salud es para facilitarle a UR la colección de mi Información de Salud con los propósitos de UR.

Yo entiendo y estoy de acuerdo que UR puede revelar mi Información de Salud a miembros designados de los equipos de Recursos Humanos, Legales y Seguridad Corporativa de UR, como sea necesario, para saber, administrar, o usar la información con los propósitos de UR y por la presente, doy mi consentimiento voluntariamente para que UR lo haga.

UR e Intrivo tomara las medidas técnicas y de seguridad organizacional apropiadas para proteger mi Información de Salud como la perdida, mal uso, acceso no autorizado, y divulgación y restringirá acceso a aquellos que no necesiten saber, administrar o utilizar la información.

También, yo entiendo y estoy de acuerdo que mi Información de Salud será guardada en los Estados Unidos y, como tal, será sujeta a las leyes aplicables en los Estados Unidos, incluyendo cualquier ley que permita y requiera divulgar la información al gobierno, agencias gubernamentales, cortes y agentes de la ley en esa jurisdicción.

Yo entiendo que podre tener el derecho a solicitar acceso y rectificación de mi Información de Salud bajo la ley aplicable y podre ejercitar estos derechos al contactar a privacy@ur.com.

Yo entiendo que mi consentimiento es voluntario. Si no doy mi consentimiento, UR me considerara como un individuo no vacunado, a menos que haga arreglos alternativos para poder proveer mi Estatus de Vacunación a Recursos Humanos de UR, y no seré elegible para utilizar el programa de pruebas de Intrivo.  Yo entiendo que podre revocar mi consentimiento en cualquier momento por cualquier razón y que tengo el derecho a una copia de esta autorización.`,
    },
    updateVaccineStatus: {
      title: 'Platíquenos sobre su \nestatus de vacunación',
      vaccinated: 'Estoy vacunado',
      partiallyVaccinated: 'Estoy parcialmente vacunado',
      notVaccinated: 'NO estoy vacunado',
      dontShare: 'No quiero compartir',
      statusSaved: 'Estatus de vacunación guardado',
    },
    event: {
      share: 'Comparta evento con invitados',
      eventCode: {
        header: 'Ingrese código',
        subtitle: 'Por favor ingrese el código proporcionado',
        enter: 'Código',
        button: 'Continuar',
      },
      emptyEvent: {
        title: 'Eventos 2Gather',
        subtitle:
          'Tranquilidad para amigos, familiares y colegas a través de nuestro programa fácil de pruebas.',
        steps: {
          1: 'Anfitrión crea un evento',
          2: 'El invitado se une al evento y comparte cuando se ha hecho una prueba',
          3: 'Todos se sienten tranquilos en el evento',
        },
      },
      eventsList: {
        title: 'Eventos',
        newEvent: 'Crear o unirse',
        host: 'EVENTOS ORGANIZADOS POR USTED',
        guest: 'EVENTOS A LOS QUE ESTA USTED INVITADO',
      },
      eventInfo: {
        date: 'Fecha',
        time: 'Hora del evento',
        host: 'Anfitrión',
        tabEventInfo: 'Información del Evento',
        tabEventMembers: 'Invitados',
        tested: 'Prueba completada a tiempo',
        notTested: 'Aún no ha completado prueba',
        shareEvent: 'Comparta evento con los invitados',
        joinEvent: 'Si, unirme al evento',
        back: 'Regresar a eventos',
        deleteEvent: 'Eliminar evento',
        leaveEvent: 'Salir del evento',
        deleteAlertTitle: 'Eliminar evento',
        deleteAlertSubtitle:
          '¿Esta seguro que quiere eliminar su evento? Al hacerlo, no tendrá acceso a los detalles del evento.',
        deleteAlertConfirm: 'SI',
        deleteAlertCancel: 'NO',
        cancel: 'Cancelar',
        inviteTitle: 'Platilla de invitación',
        leaveTitle: 'Dejar un evento',
        leaveSubtitle: '¿Esta seguro que quiere dejar el evento?',
        inviteText:
          'Hola,\n\nEn preparación para {{description}} evento el {{date}} a las {{time}}, quisiera invitarte a completar una prueba de COVID-19 dentro de {{testTime}} horas del evento. Aquí esta como empezar.\n\nPaso 1: Baje la aplicación de On/Go en app.letsongo.com  \n\nPaso 2: Use el código {{code}} para unirse al evento y para recibir su prueba de COVID gratis.  \n\nGracias por adelantado, \n{{user}}',
      },
      eventsType: {
        create: {
          title: 'Crear un evento nuevo',
          subtitle: 'Planificar un plan de pruebas antes de su evento',
          final: '¡Evento creado!',
        },
        join: {
          title: 'Unirse a un evento actual',
          subtitle: 'Ingrese un código de evento para unirse',
          final: '¡Se ha unido al evento!',
          info: {
            title: '¿Es este el evento al que se quiere unir?',
            subtitle: `{{host}} te esta invitando a completar una prueba de COVID antes del evento {{eventName}}. Seleccione “Si, unirme al evento” y le darán acceso a una prueba GRATIS de On/Go.

Aceptando esta invitación también quiere decir que esta de acuerdo con compartir cualquier prueba completada dentro de {{time}} horas antes del comienzo del evento (sus resultados no serán compartidos, solo su estatus).

Si sale POSITIVO para COVID-19, por favor siga las guías del CDC y quédese en casa.`,
          },
          joinedInfo: {
            title: 'Recuerde',
            subtitle: `Debe completar la prueba dentro de {{time}} horas antes del inicio de este evento.

Si usted ha completado una prueba On/Go dentro del tiempo requerido, su anfitrión será notificado. `,
            discountHost: `{{host}} ha pagado por su prueba, ahora solo necesitamos su información de envio.👇`,
            discountHostNone: `Desafortunadamente, ya no quedan pruebas reservadas por {{host}}. Todavía puede comprar su propia prueba.`,
            // discountCode: `Utilice el código de descuento {{discount}} en caja.`
            discountInfo: `Debe completar la prueba dentro {{time}} horas antes del inicio de este evento. Si usted ha completado una prueba On/Go dentro del tiempo requerido, su anfitrión será notificado.`,
          },
        },
      },
      createEvent: {
        title: 'Detalles de Eventos 2Gather',
        name: 'Nombre de evento',
        date: 'Fecha de evento',
        time: 'Hora de evento',
        save: 'Guardar evento',
        moreTitle: 'Pruebas fáciles de COVID para eventos',
        moreSubtitle:
          'Antes de su evento, invite a sus invitados ha completar una prueba On/Go con descuento. ',
        moreSubtitleLink: 'Más Información',
        question: '¿Cuales son los detalles de su evento?',
        button: 'Continuar',
        limitTitle: 'Nota: ',
        limitSubtitle: 'limite de 100 invitados por invitación',
      },
      moreInfo: {
        header: 'Más información',
        title: 'Pruebas fáciles de COVID para eventos',
        subtitle:
          '¿Esta planeando un evento y quisiera que sus invitados completaran una prueba antes de su evento?',
        stepTitle: 'Es fácil. Aquí esta como funciona.',
        steps: {
          1: 'Organice un evento y compre pruebas con descuento para sus \ninvitados',
          2: 'Invite a invitados a su evento y a que reciban \nsus pruebas en casa',
          3: 'Cheque que sus invitados hayan completado una prueba antes de \nsu evento',
        },
        footer: '¡Todos se sienten bien reuniéndose!',
        button: 'Regresar a detalles de evento',
      },
      payment: {
        edit: 'Editar',
        discount: 'Descuento',
        standard: 'Incluye envío estándar',
        button: 'Confirmar pago',
        test: 'Prueba(s)',
      },
      quantity: {
        header: 'Cantidad',
        question: '¿Cuantos invitados necesitaran pruebas?',
        estimated: 'total estimado \nincluyendo envió',
        button: 'Continuar al pago',
        limit: 'limite: 100 invitados',
        limitError: 'Limit per invite is 100',
      },
    },
    bulkTesting: {
      cta: {
        title: 'Pruebas en el sitio',
        subTitle: 'Completar pruebas con sus empleados',
      },
      groups: {
        title: 'Seleccionar groupo',
      },
      employees: {
        title: 'Pruebas en el sitio',
        searchPlaceholder: 'Buscar empleado',
        addEmployee: '+ Agregar empleado',
        incomplete: 'Incompleto',
        complete: 'Completo',
      },
      addEmployee: {
        title: 'Agregar empleado',
        firstName: 'Primer nombre',
        lastName: 'Apellido',
        employeeId: 'ID de empleado',
        email: 'Correo electrónico (opcional)',
        phone: 'Número telefónico (opcional)',
        group: 'Asignar a grupo',
        invite: 'Enviar invitación',
        save: 'Agregar empleado',
        saved: '¡Empleado guardado!',
      },
      employeeDetail: {
        empty: 'No hay actividad disponible.',
        lastTested: 'ULTIMA PRUEBA:',
        nextTesting: 'PROXIMA PRUEBA:',
        recordTest: '+ Record test',
      },
      selectTest: {
        title: 'Seleccione resultado',
        invalidWarning: 'El empleado será requerido a completar otra prueba',
        button: 'Registrar resultados',
        modal: '¡Resultados guardados!',
      },
    },
    disclosureScreen: {
      title: 'Antes de comenzar...',
      description:
        'Nuestros Care Guides pueden ayudarle a navegar recursos de COVID-19, pero no son profesionales médicos. Ellos no podrán diagnosticar o tratar condiciones medicas. Por favor consulte con su doctor o farmacéutico para cualquier pregunta relacionada a su salud o antes de empezar cualquier tratamiento, incluyendo medicamentos en el mostrador. \n\nSi esta teniendo una emergencia que pueda poner su vida en peligro, por favor llame al 911 inmediatamente.',
      buttonContinue: 'Continuar',
      buttonNoThanks: 'No gracias',
    },
    careSolutions: {
      loader: {
        findingGuide: {
          title: 'Buscando al proximo Care Guide',
          description: 'Cosas que podra preguntar...',
          questions: [
            '¿Como mantengo segura a mi familia?',
            '¿Como hacer una cita con un doctor para el dia de hoy?',
            '¿Como hacer la cuarentena divertida?',
            '¿Que hacer si mi prueba de COVID-19 sale positiva?',
            '¿Cuales son las guías de aislamiento y cuarentena actuales del CDC?”',
            '¿O por cuanto tiempo debo aislarme?',
          ],
        },
        findingFailure: {
          title: 'Lo sentimos, estamos ayudando a otros en este momento',
          description: 'Por favor trate de nuevo en otro momento',
        },
      },
    },
    store: {
      title: 'Tienda',
      addToCart: 'Añadir a la cesta',
      added: 'agregada',
      top: 'CIMA',
      exploreOther: 'Explora otros productos',
      learn: 'Aprende más',
      startingAt: 'a partir de',
      test: 'prueba',
    },
    cart: {
      title: 'Carro',
      orderSummary: 'Resumen del pedido',
      subtotal: 'Total parcial',
      shipping: 'Envío',
      estimatedTax: 'Impuesto estimado',
      coupon: 'Cupón',
      total: 'Total',
      estimatedTotal: 'Total Estimado',
      proceedCheckout: 'Pasar por la caja',
      free: 'GRATIS',
      promocodePlaceholder: 'Introduce el código de promoción',
      emptyCart: {
        title: 'Tu carrito esta vacío',
        startShopping: 'Empieza a comprar',
        otherProductTitle: 'On/Go COVID-19 Self-Test',
        otherProductDescription:
          'COVID-19 self-test with two tests per box, offering results in just 10 minutes.',
      },
    },
    calendar: {
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jeu', 'Vie', 'Sáb'],
      today: 'Hoy dia',
    },
    orderHistory: {
      title: 'Historial de pedidos',
      past: 'Pasada',
      pending: 'Pendiente',
    },
    orderDetail: {
      title: 'Detalles del pedido',
      placeOn: 'Colocado en',
      deliveredOn: 'Entregado en',
      payment: 'Pago',
      endingOn: 'terminando en',
      forSupport: 'Para obtener ayuda con su pedido, comuníquese con',
      email: 'support@letsongo.com',
      tracking: 'Seguimiento',
      startPrep: 'Comience a prepararse para sus próximas pruebas.',
      viewChecklist: 'Ver lista de verificación',
    },
    reporting: {
      title: 'Informes',
      shareResult: 'Compartir resultados',
      shareHelp: 'Comparta los resultados y ayude a construir mejores datos públicos de COVID-19',
      helpBuild: 'Ayude a construir mejores datos públicos de COVID-19',
      learnAbout: 'Conozca por qué solicitamos esta información',
      option1: 'Reportar resultados',
      option1Subtitle: 'Se compartirán los resultados de su prueba y su información personal.',
      option2: 'Reportar resultados de forma anónima',
      option2Subtitle:
        'Se compartirán los resultados de su prueba, pero no su información personal.',
      option3: 'No reportar resultados',
      option3Subtitle:
        'No se compartirán los resultados de sus pruebas ni su información personal.',
      note: 'NOTA',
      noteDescription:
        'su selección se aplicará a todas sus pruebas y a las pruebas de sus dependientes en el futuro. Actualice su preferencia en <blue>Configuración de la cuenta</blue> en cualquier momento.',
      content1:
        'Las pruebas de COVID-19 autoadministradas, como On/Go, reflejan un cambio significativo de las pruebas tradicionales en los laboratorios. Si bien los resultados de una prueba como On/Go pueden permanecer privados, esta es su oportunidad de ayudar a mejorar los datos de salud pública sobre las infecciones por COVID-19. \n\nSus opciones incluyen:',
      reportResultDescription:
        'El resultado de su prueba y su información personal (nombre, dirección, etc.) se informarán al departamento de salud de su estado, si su estado ha optado por recibir esta información. Su estado puede usar esta información para comunicarse con usted (por ejemplo, para realizar un seguimiento de contactos). El resultado de su prueba también se informará de forma anónima a los CDC, sin ninguna información que lo identifique como la persona que realizó la prueba.',
      resultsAnonymouslyDescription:
        'El resultado de su prueba se informará de forma anónima a los CDC, sin ninguna información que lo identifique como la persona que realizó la prueba. El departamento de salud de su estado también puede recibir esta misma información.',
      notReportResult:
        'El resultado de su prueba y toda la demás información que proporcione no se compartirán con el departamento de salud de su estado ni con los CDC.',
      shareNote:
        'Estas opciones se aplican a los datos que se comparten con el gobierno y no para el propósito de On/Go.',
      informationShared: 'Ver qué información se compartirá',
      instruction:
        'Si desea ayudar a mejorar aún más los datos públicos, también puede proporcionar la dirección, el sexo, la raza y el origen étnico (campos opcionales)',
      instruction1: 'Todos los campos son opcionales, a menos que estén marcados con un *',
      instruction2: '(No se compartirá el nombre)',
      informationSaved: '¡Información guardada!',
    },
    pretestChecklist: {
      title: 'Lista de verificación previa a la prueba',
      trackYourOrder: 'Rastrea tu orden',
      whatToDo: 'Qué hacer antes de tiempo',
      content1: 'Beber mucha agua',
      description1:
        'Beba mucha agua las 24 horas antes de hacerse la prueba. Esto facilitará la producción de la muestra de sangre necesaria.',
      content2: 'Reducir el estrés de los dedos',
      description2:
        'No planifique ninguna actividad física hasta 8 horas después de realizar la prueba. Es posible que experimente algunos moretones leves en los dedos.',
      content3: 'Planifique el envío con anticipación',
      description3:
        'Querrá asegurarse de que puede dejar su muestra en la oficina de correos o programar una recogida dentro de 1 hora después de completar la prueba.',
      resources: 'Recursos',
      learnVitamin: 'Más información sobre la vitamina D',
    },
  },
};

export default es;
