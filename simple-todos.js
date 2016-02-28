Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")){
        return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
      } else {
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
    },
    hideCompleted: function(){
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();      
    }
  });

  Template.body.events({
    "submit .new-task": function(event){
      // Prevent default behavior of browser
      event.preventDefault();

      // Get text from the form
      var text = event.target.text.value;

      // Insert text into the database
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      // Clears the form
      event.target.text.value = "";
    },
    "change .hide-completed input": function(){
      Session.set("hide-completed", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function(){
      // It sets the checked property to the opposite of its current value
       Tasks.update(this._id, {
         $set: {checked: ! this.checked}
       });
    },
    "click .delete": function(){
      Tasks.remove(this._id);
    }
  });
}
