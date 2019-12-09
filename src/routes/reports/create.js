import Report from '../../models/report';

const create = (req, res) => {
    var newReport = {
        configurationId: "5de66eafd4ab4d0ce8fee423",
        parameters: {
            url: "https://cl9lba3no5.execute-api.us-east-2.amazonaws.com/Prod/"
        },
        generatedAt: "2019-12-03T18:20:23+0000",
        summary: {
            run: 4,
            passed: 1,
            warned: 1,
            failed: 1,
            skipped: 1
        },
        groups: [
            {
                name: "Sequence",
                summary: {
                    run: 2,
                    passed: 1,
                    warned: 1,
                    failed: 0,
                    skipped: 0
                },
                cases: [
                    {
                        name: "Get phage reference sequence",
                        status: 1
                    },
                    {
                        name: "Get yeast reference sequence",
                        status: 2
                    }
                ]
            },

            {
                "name": "Metadata",
                summary: {
                    run: 2,
                    passed: 0,
                    warned: 0,
                    failed: 1,
                    skipped: 1
                },
                cases: [
                    {
                        name: "Get mouse reference sequence",
                        status: 3
                    },

                    {
                        name: "Get human reference sequence",
                        status: 4
                    }
                ]
            }
        ]        
    }

    Report.create(newReport, (error, created) => {
        if (error) {
            res.send(error);
        } else {
            res.send(created);
        }
    })
}

export default create;
