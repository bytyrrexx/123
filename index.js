const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

let prefix = config.prefix;

client.on("ready", () => {
    console.log(`Estoy listo!, 
             conectado en ${client.guilds.cache.size} servidores y  ${client.users.cache.size} usuarios.`);
 
//////////////////////// PRECENCIA //////////////
client.user.setPresence({
    status: "online",
    activity: {
        name: "!!help | EN DIRECTO",
        url: "https://www.twitch.tv/barcagamer",
        type: "STREAMING"
    }
});

 
 });
 



    client.on("message", (message) => {
        //KICKEOS
        if (!message.content.startsWith(prefix)) return; 
        if (message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
    
        
        switch (command){
            case "kick": 
    
                let mencionado = message.mentions.users.first();
                let razon = args.slice(1).join(' ');
                
                let permiso = message.member.hasPermission("KICK_MEMBERS");

                if(!permiso){
                    message.channel.send('No tiene el permiso de kickear');
                }
                

                if(!mencionado) return message.reply(`No ha mencionando a ningún miembro.`);
                if(!razon) return message.channel.send(`Escriba una razón del uso de kick.`);
                
                message.guild.member(mencionado).kick(razon);
                message.channel.send(`**${mencionado.username}**, fue expulsado del servidor, razón: ${razon}.`);

        };
       });
       
       client.on("message", (message) => {
///////////////////////////// SALUDO //////////////////////////
        if (!message.content.startsWith(prefix)) return; 
        if (message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        switch (command){
            case "hola": 
                
                let mencionado = message.mentions.users.first();
                let razon = args.slice(1).join(' ');
                
                if(!mencionado) return message.reply(`Menciona a quien quieres saludar!.`);
                
                message.channel.send(`Hola!!!  **${mencionado.username}**.`);
            }
       
       });
       
       client.on("message", (message) => {

        /////////////////////////// DESPEDIDA /////////////////////////////
        if (!message.content.startsWith(prefix)) return; 
        if (message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
    
        
        switch (command){
            case "adios": 
                
                let mencionado = message.mentions.users.first();
                let razon = args.slice(1).join(' ');
                
                if(!mencionado) return message.reply(`De quien te despides?.`);
                
                message.channel.send(`Me voy **${mencionado.username}**!!!.`);
            }
       
       });

///////////////////////////////// ALGUIEN NUEVO ENTRO //////////////////////////////////////////
client.on('guildMemberAdd', (member) => {

    let msgChannel = new Discord.MessageEmbed()
       .setThumbnail(member.user.displayAvatarURL())
       .setDescription(member.user.username + ' se unio al servidor!')
       .setFooter('Ahora somos ' + member.guild.memberCount + ' miembros.' )
       .setColor("BLUE") 
  
     // Enviamos el mensaje a un canal segun el ID-CANAL
     let channel = client.channels.cache.get('845405438182948874');
     channel.send(msgChannel);
  
  })
  
    ///////////////////////////// SE HA IDO UNA PERSONA /////////////////////////////////
    client.on('guildMemberRemove', (member) => {

        let msgChannel = new Discord.MessageEmbed()
           .setThumbnail(member.user.displayAvatarURL())
           .setDescription(member.user.username + ' dejo el servidor!')
           .setFooter('Ahora somos ' + member.guild.memberCount + ' miembros.' )
           .setColor("RED") 
      
         // Enviamos el mensaje a un canal segun el ID-CANAL
         let channel = client.channels.cache.get('845405438182948874');
         channel.send(msgChannel);
      
      })
      
    



    client.on("messageDelete", (message) => {
        let canal = client.channels.cache.get('845405438757044258'); 
        canal.send(`**${message.author.username}** elimino un mensaje con el contenido: **${message}**`);
       
    });
    
/////////////////////////////// CANALES EDITADOS /////////////////////////////////////////



    client.on('channelUpdate', (oldChannel, newChannel) => {
        //Validamos que el evento sea en un servidor
        if(!oldChannel.guild) return;
      
        // Solicitamos los datos del logs de la auditoria registrado en un servidor
        oldChannel.guild.fetchAuditLogs().then(logs => { 
           // Obtenemos en id de usuario autor del log
           let userID = logs.entries.first().executor.id;
      
           // Verificamos que se haya actualizado el nombre de un canal
           if(oldChannel.name !== newChannel.name) {
      
            let msgName = new Discord.MessageEmbed()
            .setTitle('**[CANAL EDITADO]**')
            .setColor('RED')
            .setDescription(`**Canal editado**\nNombre anterior: **${oldChannel.name}**\nNuevo nombre: **${newChannel.name}**\nCanal ID: **${oldChannel.id}**\nPor: <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL())
            
            // Enviamos el mensaje a un canal segun el ID-CANAL
            let channel = oldChannel.guild.channels.cache.get('845405438757044256');
            channel.send(msgName);
           }
        })
      
      })

//////////////////////// CAMBIOS Y MENSAJES ANCLADOS  //////////////////////////////////////

client.on('channelPinsUpdate', (channel, time) => {
        // Obtenemos el id del canal donde se actualizo un mensaje anclado
        let id = channel.id
       
        // Enviamos un mensaje de información en el mismo canal donde se actualizo el mensaje anclado
        channel.send('**Se actualizo un mensaje anclado en este canal**')
       
        // Enviamos un mensaje de información de la actualización del mensaje anclado en un canal X
        client.channels.cache.get('845405438757044256').send(`Se actualizo un mensaje anclado en el canal <#${id}>, fecha: ${time}`)
        
       })
       

////////////////////// EDICION DE CANALES //////////////////////////

       client.on('guildUpdate', (oldGuild, newGuild) => {
        // verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
        if(!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
       
        // Solicitamos los datos del logs de la auditoria registrado en un servidor
        oldGuild.fetchAuditLogs().then(logs => { 
         // Obtenemos el id de usuario autor del log
         let userID = logs.entries.first().executor.id;
         // Obtenemos el avatar de usuario autor del log
         let userAvatar = logs.entries.first().executor.avatarURL();
       
         // Verificamos que se haya actualizado el nombre del servidor
         if(oldGuild.name !== newGuild.name) {
           let msgChannel = new Discord.MessageEmbed()
             .setTitle('**[NUEVO NOMBRE DEL SERVIDOR]**')
             .setColor('RED')
             .setThumbnail(userAvatar)
             .setDescription(`**Nombre del canal editado correctamente**\nNombre anterior: **${oldGuild.name}**\nNuevo nombre: **${newGuild.name}**\nPor: <@${userID}> (ID: ${userID})`)
             .setTimestamp()
             .setFooter(oldGuild.name, oldGuild.iconURL())
             
             // Enviamos el mensaje a un canal segun el ID-CANAL
             let channel = client.channels.cache.get('845405438757044258');
             channel.send(msgChannel);
          }
        })
        
       })
       



///////////// MODIFICACIONES DE ROLES //////////////////////////


       client.on('roleUpdate', (oldRole, newRole) => {
        // verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
        if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
       
        // Solicitamos los datos del logs de la auditoria registrado en un servidor
        oldRole.guild.fetchAuditLogs().then(logs => { 
         // Obtenemos el id de usuario autor del log
         let userID = logs.entries.first().executor.id;
         // Obtenemos el avatar de usuario autor del log
         let userAvatar = logs.entries.first().executor.avatarURL();
       
         // Verificamos que se haya actualizado el nombre de un rol
         if(oldRole.name !== newRole.name) {
           let msgChannel = new Discord.MesssageEmbed()
             .setTitle('**[ACTUALIZACION DEL NOMBRE DE ROL]**')
             .setColor('RED')
             .setThumbnail(userAvatar)
             .setDescription(`**Nombre del rol editado correctamente**\nNombre anterior: **${oldRole.name}**\nNuevo nombre: **${newRole.name}**\nID rol: **${oldRole.id}**\nPor: <@${userID}> (ID: ${userID})`)
             .setTimestamp()
             .setFooter(oldRole.guild.name, oldRole.guild.iconURL())
             
             // Enviamos el mensaje a un canal segun el ID-CANAL
             let channel = client.channels.cache.get('845405438757044258');
             channel.send(msgChannel);
          }
        })
        
       })
       
///////////////////////////////////////////  CAMBIO DE NICKS 
client.on('guildMemberUpdate', (oldMember, newMember) => {

    // Verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
    if(!oldMember.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return
  
    // Solicitamos los datos del logs de la auditoria registrado en un servidor
    oldMember.guild.fetchAuditLogs().then(logs => { 
     // Obtenemos el id de usuario autor del log
     let userID = logs.entries.first().executor.id;
     // Obtenemos el avatar de usuario autor del log
     let userAvatar = logs.entries.first().executor.avatarURL();
  
     //vereficamos que el usuario cambio su nickname
     if(oldMember.nickname !== newMember.nickname) {
      let msgChannel = new Discord.MessageEmbed()
         .setTitle('**[NICKNAME ACTUALIZADO]**')
         .setColor('RED')
         .setThumbnail(userAvatar)
         .setDescription(`Usuario: ${oldMember.user.username} (ID: ${oldMember.user.id})\nNickname anterior: ${oldMember.nickname}\nNickname ahora: ${newMember.nickname}\nPor: <@${userID}> (ID: ${userID})`)
         .setTimestamp()
         .setFooter(oldMember.guild.name, oldMember.guild.iconURL())
  
         // Enviamos el mensaje a un canal segun el ID-CANAL
         let channel = client.channels.cache.get('845405438757044258');
         channel.send(msgChannel);
     }
  
    })
  
  })
  
      
//////////////////////////// BANEOS //////////////////////////////

      client.on('guildBanAdd', (guild, user) => {
        // Verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
        if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
       
        // Solicitamos los datos del logs de la auditoria registrado en un servidor
        guild.fetchAuditLogs().then(logs => { 
         // Obtenemos el id de usuario autor del log
         let userID = logs.entries.first().executor.id;
         // Obtenemos el avatar de usuario autor del log
         let userAvatar = logs.entries.first().executor.avatarURL();
       
         // Verificamos si el autor de la acción no sea un bot
         if(userID === client.user.id) return;
         
         let msgChannel = new Discord.MessageEmbed()
           .setTitle('**[USUARIO BLOQUEADO]**')
           .setColor('RED')
           .setThumbnail(userAvatar)
           .setDescription(`**Usuario bloqueado correctamente**\nUsuario bloqueado/baneado: <@${user.id}> (ID: ${user.id})\nPor: <{userID}> (ID: ${userID})`)
           .setTimestamp()
           .setFooter(guild.name, guild.iconURL())
             
           // Enviamos el mensaje a un canal segun el ID-CANAL
           let channel = client.channels.cache.get('845405438757044258');
           channel.send(msgChannel);
          
        })
        
       })
///////////////////////////////// DESBANEADOS /////////////////////

client.on('guildBanRemove', (guild, user) => {
    // verificamos si nuestro bot tiene permisos de ver el log de auditoria de un servidor
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
   
    // Solicitamos los datos del logs de la auditoria registrado en un servidor
    guild.fetchAuditLogs().then(logs => { 
     // Obtenemos el id de usuario autor del log
     let userID = logs.entries.first().executor.id;
     // Obtenemos el avatar de usuario autor del log
     let userAvatar = logs.entries.first().executor.avatarURL();
   
     // Verificamos si el autor de la acción no sea un bot
     if(userID === client.user.id) return;
   
     let msgChannel = new Discord.MessageEmbed()
       .setTitle('**[USUARIO DESBLOQUEADO]**')
       .setColor('RED')
       .setThumbnail(userAvatar)
       .setDescription(`**Usuario desbloqueado correctamente**\nUsuario desbloqueado/desbaneado: <@${user.id}> (ID: ${user.id})\nPor: <@${userID}> (ID: ${userID})`)
       .setTimestamp()
       .setFooter(guild.name, guild.iconURL())
       
       // Enviamos el mensaje a un canal segun el ID-CANAL
       let channel = client.channels.cache.get('845405438757044258');
       channel.send(msgChannel);
     
    })
    
   })
   


////////////////////////////// JUGADOR EN DIRECTO ////////////////////////
client.on('presenceUpdate', (oldPresence, newPresence) => {
    // creamos un rol 'En directo' y agregarlo a un usuario si esta en modo 'streaming'/En directo.
    let rol = oldPresence.guild.roles.cache.get('848861570128674857');
   
    try {
      // Verificamos si el usuario esta en estado 'en directo'
      if (newPresence.presence.game.streaming) {
   
       // Agregamos el rol 'En directo' al usuario que esta 'en directo'
       newPresence.roles.add(rol.id);
       // Enviamos el mensaje a un canal segun el ID-CANAL
       newPresence.guild.channels.cache.get('845405438182948883').send(`${newPresence.displayName} esta en directo.`);
       // Por consola
       console.log(`${newPresence.displayName} esta en directo.`);
   
      } else {
       // Verificamos que si esta el usuario que esta en directo, ya termino
       if(oldPresence.presence.game.streaming) {
        
         // Removemos el rol de 'En directo'
         oldPresence.roles.remove(rol.id);
         // Enviamos el mensaje a un canal segun el ID-CANAL
         oldPresence.guild.channels.cache.get('845405438182948883').send(`${oldPresence.displayName} termino su directo.`);
         // Por consola
         console.log(`${oldPresence.displayName} termino su directo.`);
   
       }
      }
    } catch (e) {
      // Si hay un error removemos el rol de 'En directo' al usuario
      oldPresence.roles.remove(rol.id);
    }
   
   })
   

////////////////////// AVATAR //////////////

client.on("message", (message) => {

    if (!message.content.startsWith(prefix)) return; 
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    switch (command){
        case "avatar": 

let miembro = message.mentions.users.first()
if (!miembro) {
    const embed = new Discord.MessageEmbed()
        .setImage(`${message.author.displayAvatarURL()}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${message.author.tag}`);
    message.channel.send(embed);

} else {
    const embed = new Discord.MessageEmbed()
        .setImage(`${miembro.displayAvatarURL()}`)
        .setColor(0x66b3ff)
        .setFooter(`Avatar de ${miembro.tag}`);

    message.channel.send(embed);
}
};
});


//////////////////////// OBTENER PING DEL SERVER ///////////////////////////
client.on("message", (message) => {

    if (!message.content.startsWith(prefix)) return; 
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    switch (command){
        case "ping": 


let ping = Math.floor(message.client.ws.ping);
message.channel.send(":ping_pong: Pong!, "+ ping + "ms");

    }
});

///////////////////////// ELIMINAR 500 MESAJES ///////////

client.on("message", (message) => {

    if (!message.content.startsWith(prefix)) return; 
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    switch (command){
        case "purga": 

let cantidad = parseInt(args[0]);
message.channel.bulkDelete(500);
    }
});

///////////////////// COMANDO HELP  ///////////////////////

client.on("message", (message) => {

    if (!message.content.startsWith(prefix)) return; 
    if (message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    switch (command){
        case "help": 

message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');

const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .addField('Ping', 'Compueba la latencia del BOT con la API de discord', true)
    .addField('Avatar', 'Muestra el avatar de un usuario', true)
    .addField('adios', 'Despidete de un amigo (MENCIONALO).', true)
    .addField('hola', 'Saluda a un amigo o compañero (MENCIONALO).', true)
    .addField('Invitacion', '[Link de invitacion](https://discord.gg/mBN2t3ecyA)', true)
    .setColor(0x66b3ff)
    
message.author.send(embed);
    }
});

client.login(config.token);