/*
 * Project: Image Manager.
 * Module: Drag & Drop Helper
 * Author: Georgy Bunin (bunin.co.il@gmail.com)
 * */

window.ImageManager = window.ImageManager || {};

ImageManager.ddHelper = {

    toggleDropAreaColor: function(setActive) {
        var dropArea = $(".dropArea");
        var activeClassName = "greenArea";

        if (setActive) {
            if (!dropArea.hasClass(activeClassName))
                dropArea.addClass(activeClassName);
        } else {
            if (dropArea.hasClass(activeClassName))
                dropArea.removeClass(activeClassName);
        }
    },

    dragEnter: function(evt) {
        evt.stopPropagation(); evt.preventDefault();
        ImageManager.ddHelper.toggleDropAreaColor(true);
    },

    dragLeave: function(evt) {
        evt.stopPropagation(); evt.preventDefault();
        ImageManager.ddHelper.toggleDropAreaColor(false);
    },

    dragOver: function(evt) {
        evt.stopPropagation(); evt.preventDefault();
    },

    drop: function(evt) {
        var that = ImageManager.ddHelper;

        evt.stopPropagation();
        evt.preventDefault();

        evt.dataTransfer = evt.dataTransfer || undefined;
        evt.dataTransfer = evt.dataTransfer || evt.target.files;

        if (evt.dataTransfer != undefined) {
            var files = evt.dataTransfer.files || evt.dataTransfer;
            if (files.length > 0) that.handleFiles(files);
        }
        ImageManager.ddHelper.toggleDropAreaColor(false);
    },

    handleFiles: function (files) {
        var that = ImageManager.ddHelper;

        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.CustomFileName = files[i].name;
            reader.onprogress = that.handleReaderProgress;
            reader.onloadend = that.handleReaderLoadEnd;
            reader.readAsDataURL(files[i]);
        }
    },

    handleReaderProgress: function(evt) {
        evt.lengthComputable = evt.lengthComputable || undefined;
    },

    handleReaderLoadEnd: function(evt) {
        ImageManager.dbHelper.CreateImage(this.CustomFileName, evt.target.result);
    }
};
