var ajax = {
    get: function (url, options = {}, success, error)
    {
        return new Promise(function (resolve, reject)
        {
            var request = new XMLHttpRequest();

            request.onload = function ()
            {
                if (request.readyState === 4 && request.status === 200)
                {
                    if (!request.responseText)
                    {
                        if (success)
                        {
                            success();
                        }

                        return resolve();
                    }

                    if (options.dataType && options.dataType.toLowerCase() === 'html')
                    {
                        if (success)
                        {
                            options.success(this.responseText);
                        }

                        resolve(JSON.parse(request.responseText));
                    }

                    if (success)
                    {
                        success(JSON.parse(request.responseText));
                    }

                    resolve(JSON.parse(request.responseText));
                }

                if (request.readyState === 4 && request.status !== 200)
                {
                    if (error)
                    {
                        error(request.statusText);
                    }

                    reject(request.statusText);
                }
            }

            request.open('GET', url, true);

            request.send();
        });
    },
    post: function (url, data, success, error)
    {
        return new Promise(function (resolve, reject)
        {
            var request = new XMLHttpRequest();

            request.onload = function ()
            {
                if (request.readyState === 4 && request.status === 200)
                {
                    if (!request.responseText)
                    {
                        if (success)
                        {
                            success();
                        }

                        return resolve();
                    }

                    if (success)
                    {
                        success(JSON.parse(request.responseText));
                    }

                    resolve(JSON.parse(request.responseText));
                }

                if (request.readyState === 4 && request.status !== 200)
                {
                    if (error)
                    {
                        error(request.statusText);
                    }

                    reject(request.statusText);
                }
            }

            request.open('POST', url, true);

            var formData = new FormData();

            if (data)
            {
                for (var key in data)
                {
                    formData.append(key, data[key]);
                }
            }

            request.send(formData);
        });
    }
}
